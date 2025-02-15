package websocket

// will be used to manage anything related to a single client.
// whenever we have a client connecting to the server, we will create a new client object
import (
	"encoding/json"
	//"fmt"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

var (
	pongWait     = 10 * time.Second
	pingInterval = (pongWait * 9) / 10 // how often we send ping to the clients, this has to be lower than the pongWait. allow server to have 90% of the time to wait for the pong
)

type ClientList map[*Client]bool

type Client struct {
	connection *websocket.Conn
	manager    *Manager
	otp        string
	egress     chan Event
}

// each client will accepts a conn and a manager
func NewClient(conn *websocket.Conn, manager *Manager, otp string) *Client {
	return &Client{
		connection: conn,
		manager:    manager,
		egress:     make(chan Event),
		otp:        otp,
	}
}

// Reading messages from the client websocket connection
func (c *Client) readMessages() {
	// defer all the cleanup code
	defer func() {
		// print loggedinUsers before and after delete
		delete(c.manager.loggedinUsers, c.otp)
		var request Event
		// Extract values from the map to values slice
		values := make([]string, 0, len(c.manager.loggedinUsers))
		for _, v := range c.manager.loggedinUsers {
			values = append(values, v)
		}

		// Convert the values to JSON
		jsonData, err := json.Marshal(values)
		if err != nil {
			log.Fatal(err)
		}

		// Assign the JSON to request.Payload
		request.Payload = jsonData
		request.Type = EventAcknowledgement
		if err := c.manager.routeEvent(request, c); err != nil {
			log.Printf("error routing event: %v", err)
		}
		// remove the client from the manager
		c.manager.removeClient(c)
		c.connection.Close()
	}()

	if err := c.connection.SetReadDeadline(time.Now().Add(pongWait)); err != nil {
		log.Println(err)
		return
	}

	c.connection.SetReadLimit(512)
	c.connection.SetPongHandler(c.pongHandler)

	for {
		// loop runs forever and listens to messages from the connection
		_, payload, err := c.connection.ReadMessage()
		if err != nil { // when conn is (unexpectedly) closed
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error reading message: %v", err)
			}
			break
		}
		//fmt.Println("payload", string(payload))

		var request Event
		if err := json.Unmarshal(payload, &request); err != nil {
			log.Printf("error unmarshaling event: %v", err)
			break
		}

		if err := c.manager.routeEvent(request, c); err != nil {
			log.Printf("error routing event: %v", err)
		}
	}
}

// Write messages to the websocket
func (c *Client) writeMessages() {

	ticker := time.NewTicker(pingInterval)

	for {
		select {
		// when messsages are sent, we will send it to the egress channel. egress channel will one by one select the messages and fire them on the websocket. concurrent safe solution to send messages
		case message, ok := <-c.egress:
			if !ok {
				if err := c.connection.WriteMessage(websocket.CloseMessage, nil); err != nil {
					log.Println("connection closed", err)
				}
				return
			}

			data, err := json.Marshal(message)

			if err != nil {
				log.Println(err)
				return
			}

			if err := c.connection.WriteMessage(websocket.TextMessage, data); err != nil {
				log.Printf("failed to send message: %v", err)
			}
			//fmt.Println("message sent", string(message.Payload))

		case <-ticker.C:
			//fmt.Println("ping")
			// send a ping to the client
			if err := c.connection.WriteMessage(websocket.PingMessage, []byte(``)); err != nil {
				log.Println("writemsg error", err)
				return
			}
		}
	}
}

// Handles the pong message from the client
func (c *Client) pongHandler(string) error {
	//fmt.Println("pong")
	return c.connection.SetReadDeadline(time.Now().Add(pongWait))
}
