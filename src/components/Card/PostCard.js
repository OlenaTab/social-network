import React, { useState, useEffect } from 'react';
import Avatar from './CommentCard';

function decodeJwt(jwt) {
  if (!jwt) {
    return null; // Or handle the error in an appropriate way
  }

  const base64Url = jwt.split(".")[1];
  if (!base64Url) {
    return null; // Or handle the error in an appropriate way
  }

  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const decoded = atob(base64);
  const result = JSON.parse(decoded);
  return result;
}

function PostCard(props) {
  const [publicPosts, setPublicPosts] = useState([]);
  const [privatePosts, setPrivatePosts] = useState([]);
  const [customPosts, setCustomPosts] = useState([]);
  const token = localStorage.getItem('token');
  const userId = decodeJwt(token).userID;
  
  
  useEffect(() => {
    const GetUserPosts = async (e) => {
      //e.preventDefault();
      const headers = new Headers();
    
      console.log("userId postcard", userId)
      headers.append('Authorization', 'Bearer ' + token);
      headers.append('Content-Type', 'application/json');
      
      try {
        const res = await fetch("http://localhost:8080/posts", {
          method: 'GET',
          headers: headers,
        });
        
        if (res.ok) {
          const data = await res.json();
          console.log("data", data)
          // get all posts of that matched with userID
          const publicPosts = data.publicPosts ;
          const privatePosts = data.privatePosts;
          const customPosts = data.customPosts;
          setPublicPosts(publicPosts);
          setPrivatePosts(privatePosts);
          setCustomPosts(customPosts);
        } else {
          console.log("error");
        }
      }
      catch (error) {
        // Handle error
        console.log(error);
      }
     
    };
    GetUserPosts();
  }, []);

  // Combine the three arrays into one including only posts that match post.AuthorID  with userID
  const allPosts = [...(customPosts || []), ...(privatePosts || []), ...(publicPosts || [])];
  console.log("all",allPosts)
  // Sort the combined and filtered array by the "CreateAt" property
  const sortedPosts = allPosts.sort((a, b) => new Date(a.CreateAt) - new Date(b.CreateAt));
  console.log("sorted", sortedPosts)
  // store posts that matched with userID in an array
  const userPosts = sortedPosts.filter((post) => post.AuthorID === userId);
  console.log("userposts", userPosts)


  const displayAllPosts = () => {
    // display all posts of that matched with userID
    
    return userPosts.map((post) => {
      console.log("post", post)
      return (
        <div key={`${post.Privacy + post.PostID}`} className="bg-white p-4 rounded shadow mt-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <img src={props.userInfo.profilePicture} alt="avatar" className="rounded-circle me-2"/>
              <div>
                <p className="m-0 fw-bold">{props.  username}</p>
                <span className="text-muted fs-7">{post.CreateAt}</span>
              </div>
            </div>
            <i className="fas fa-ellipsis-h" type="button" id="post1Menu" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <ul className="dropdown-menu border-0 shadow" aria-labelledby="post1Menu">
              <li className="d-flex align-items-center">
                <a className="dropdown-item d-flex justify-content-around align-items-center fs-7" href="#">Edit Post</a>
              </li>
              <li className="d-flex align-items-center">
                <a className="dropdown-item d-flex justify-content-around align-items-center fs-7" href="#">Delete Post</a>
              </li>
            </ul>
          </div>
          <div className="mt-3">
            <div>
              <p>{post.Content}</p>
              <img src="https://source.unsplash.com/random/12" alt="post image" className="img-fluid rounded"/>
            </div>
            <Avatar username={props.username} userInfo={props.userInfo}/>  
          </div>
        </div>
      )
    })
  }

    return(
      <>
        {displayAllPosts()}
      </>
      )
}

export default PostCard;