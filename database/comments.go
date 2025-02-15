package database

import (
	"database/sql"
	//"fmt"
	u "socialnetwork/utils"
	"time"

	"github.com/google/uuid"
)

// Comment represents a comment in the social network.
type Comment struct {
	CommentID string
	PostID    string
	UserName  string
	Content   string
	CreateAt  time.Time
}

// CommentResponse represents a response object for a comment in JSON format.
type CommentResponse struct {
	CommentID       string    `json:"commentID"`
	PostID          string    `json:"postID"`
	UserName        string    `json:"userName"`
	Content         string    `json:"content"`
	CreateAt        time.Time `json:"createAt"`
	AuthorFirstName string    `json:"authorFirstName"`
	AuthorLastName  string    `json:"authorLastName"`
}

// AddComment adds a new comment to the database.
func AddComment(comment *CommentResponse) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()
	query := `
		INSERT INTO Comments (CommentID, PostID, UserName, Content, CreateAt)
			VALUES (?, ?, ?, ?, ?);`

	// Generate UUID for commentID
	comment.CommentID = uuid.New().String()
	stmt, err := db.Prepare(query)
	u.CheckErr(err)
	_, err = stmt.Exec(
		comment.CommentID,
		comment.PostID,
		comment.UserName,
		comment.Content,
		comment.CreateAt,
	)
	u.CheckErr(err)
	return nil
}

// GetCommentsByPostID retrieves all comments associated with a specific postID.
func GetCommentsByPostID(postID string) ([]CommentResponse, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	query := `
		SELECT CommentID, PostID, UserName, Content, CreateAt
		FROM Comments
		WHERE PostID = ?
	`
	rows, err := db.Query(query, postID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var comments []CommentResponse
	for rows.Next() {
		var comment CommentResponse
		err := rows.Scan(
			&comment.CommentID,
			&comment.PostID,
			&comment.UserName,
			&comment.Content,
			&comment.CreateAt,
		)
		if err != nil {
			return nil, err
		}

		// Fetch the user information based on the UserName
		//fmt.Println("comment", comment)
		author, err := GetUserByUsername(comment.UserName)
		if err != nil {
			//fmt.Println("Error fetching user information for comment author.")
			return nil, err
		}

		comment.AuthorFirstName = author.FirstName
		comment.AuthorLastName = author.LastName
		comments = append(comments, comment)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return comments, nil
}
