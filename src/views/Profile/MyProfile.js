import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Switch from "react-switch";
import CreatePost from "../../components/CreatePost/CreatePost";
import PostCard from "../../components/Card/PostCard";
import AvatarSquare from "../../components/Avatar/AvatarSquare";
import "./Profile.css";
import ChangeProfilePicModal from "../../components/Modal/ChangeProfilePicModal";
import UpdateProfileSettingsModal from "../../components/Modal/UpdateProfileSettingsModal";
import Topnav from "../Topnav";
import { Link } from 'react-router-dom';
//import { set } from 'draft-js/lib/DefaultDraftBlockRenderMap';

function MyProfile(props) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const allusers = useSelector((state) => state.allUsers);
  const [myfollowers, setFollowers] = useState([]);
  const [myfollowersInfo, setMyfollowersInfo] = useState([]);


  // format date of birth to be displayed to dd month yyyy
  const dob = new Date(userInfo.DateOfBirth).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const day = dob.split(" ")[1];
  const month = dob.split(" ")[0];
  const year = dob.split(" ")[2];
  const formattedDOB = `${day} ${month} ${year}`.replace(/,/g, ""); // remove comma from date

  const [privacy, setPrivacy] = useState(userInfo.Privacy);
  useEffect(() => {
    if (userInfo) {
      setPrivacy(privacy);
    }
      // get all my followers
      if (userInfo.FollowerUsernames) {
        const myFollowers = userInfo.FollowerUsernames.split(",");
        setFollowers(myFollowers);
    } else {
        setFollowers([]);
    }
  }, [userInfo]);

  useEffect(() => {
      if (myfollowers && allusers) {
        const myFollowersInfo = [];
        myfollowers.forEach((follower) => {
            const followerInfo = allusers.find((user) => user.UserName === follower);
            myFollowersInfo.push(followerInfo);
            
        });
        setMyfollowersInfo(myFollowersInfo);
      } else {
        console.log("missing")
        setMyfollowersInfo([]);
      }
    }
  , [myfollowers, allusers]);


  const handlePrivacyChange = (checked) => {
    allusers.forEach((user) => {
      const notification = {
        type: "notification",
        payload: {
          receiverUsername: user.UserName,
          senderUsername: "",
        },
      };
      if (props.socket) {
        props.socket.send(JSON.stringify(notification));
      } else {
        setTimeout(() => {
          if (props.socket) {
            props.socket.send(JSON.stringify(notification));
          } else {
            console.log("Socket not open");
          }
        }, 1000);
      }
    });

    const newPrivacy = checked ? "public" : "private";
    setPrivacy(privacy === "public" ? "private" : "public");
    updatePrivacy(newPrivacy); // Call the function to update the privacy in the backend
  };
  const updatePrivacy = async (privacy) => {
    const token = localStorage.getItem("token");
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + token);
    headers.append("Content-Type", "application/json");
    try {
      const response = await fetch("http://localhost:8080/updateprivacy", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ privacy }),
      });

      if (response.ok) {
        console.log("Privacy updated successfully");
        const data = await response.json();
        dispatch({ type: "SET_USER", payload: data });
      } else {
        throw new Error("Error updating privacy");
      }
    } catch (error) {
      console.error("Error updating privacy:", error);
    }
  };
  return (
    <div>
      <Topnav
        userDisplayname={props.userDisplayname}
        socket={props.socket}
      />
      <div className="container-fluid" >
        <section className="profileTopnav">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center h-100" >
              <div className="col-8" >
                <div className="card">
                  <div className="card-body p-4">
                    <div className="d-flex text-black">
                      <div className="flex-shrink-0">
                        <img
                          src={userInfo.Avatar}
                          alt="Generic placeholder image"
                          className="img-fluid"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="d-flex align-items-center">
                          <h2 className="mb-0 mr-2">
                            <strong>{props.userDisplayname}</strong>
                          </h2>
                          {userInfo.Nickname && (
                            <span className="nickname-text">
                              <small className="text-muted">
                                {userInfo.Nickname}
                              </small>
                            </span>
                          )}
                        </div>
                        <div
                          className="d-flex justify-content-start rounded-3 p-2 mb-2"
                          style={{ backgroundColor: "#efefef" }}
                        >
                          <div className="px-3">
                            <p className="small text-muted mb-1">Followers</p>
                            <p className="mb-0">976</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <i className="fas fa-globe mr-2"></i>
                          <small className="mb-0 text-muted mr-2">
                            Your profile is now:
                          </small>
                          {privacy !== null && (
                            <span className="switch">
                              <small
                                className="switch-label text-muted mr-2"
                                htmlFor="privacyToggle"
                              >
                                {privacy}
                              </small>
                              <Switch
                                checked={privacy === "public"} // Provide a default value of false when privacy is null
                                onChange={handlePrivacyChange}
                                onColor="#86d3ff"
                                onHandleColor="#2693e6"
                                handleDiameter={16}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                height={14}
                                width={36}
                                className="react-switch"
                                id="privacyToggle"
                              />
                            </span>
                          )}
                        </div>
                        <button
                          href="#"
                          className="btn btn-primary btn-sm d-flex justify-content-center align-items-center"
                          id="ChangeProfilePic"
                          data-bs-toggle="modal"
                          data-bs-target="#changeProfilePicModal"
                          >
                          <i className="fa fa-picture-o fa-lg" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ChangeProfilePicModal userDisplayname={props.userDisplayname} />
        <div className="row justify-content-evenly">
          <div className="col-12 col-lg-3">
            <div
              className="d-flex flex-column justify-content-center w-100 mx-auto"
              id="d-flex-postcontainer-followersbox"
            >
              <div className="bg-white rounded border shadow p-3">
                <ul>
                  <li className="dropdown-item p-1 rounded">
                    <div>
                      <p className="m-0">
                        <strong>Intro</strong>
                      </p>
                    </div>
                  </li>
                  {userInfo.AboutMe && (
                    <li className="dropdown-item p-1 rounded text-center">
                      <p className="text-center">{userInfo.AboutMe}</p>
                    </li>
                  )}
                  <li className="dropdown-item p-1 rounded">
                    <span>
                      <i className="fas fa-user"></i>{" "}
                      <span className="name">{userInfo.Nickname}</span>
                    </span>
                  </li>
                  <li className="my-2 p-1">
                    <span>
                      <i className="fas fa-edit"></i>{" "}
                      <span className="name">{userInfo.Email}</span>
                    </span>
                  </li>
                  <li className="dropdown-item p-1 rounded">
                    <span>
                      <i className="fas fa-birthday-cake"></i>{" "}
                      <span className="name">{formattedDOB}</span>
                    </span>
                  </li>
                  <li className="dropdown-item p-1 rounded">
                    {/* <button
                      type="button"
                      className="btn btn-primary w-100"
                      data-bs-toggle="modal"
                      data-bs-target="#updateProfileSettingsModal"
                    >
                      Edit Profile */}
                    {/* </button>
                    <UpdateProfileSettingsModal
                      userDisplayname={props.userDisplayname}
                      userInfo={userInfo}
                    /> */}
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded border shadow p-3">
                <div className="p-2">
                    <p className="m-0"><strong>Followers</strong></p>
                </div>
                <div className="follow-box-content p-1 m-0 d-flex">
                  {myfollowersInfo?.length === 0 ? (
                      <p className="m-0">You have no followers</p>
                  ) : (
                      // If not empty, map over the followers
                      myfollowersInfo?.map((follower) => (
                          <div className="p-2" key={follower.UserName}>
                            <Link to={`/othersprofile/${follower.UserName}`} className="text-decoration-none text-dark">
                              <div className="fellows d-flex align-items-center">
                                <AvatarSquare avatar={follower.Avatar} />
                              </div>
                              <div className="fellows d-flex align-items-center">
                                <p className="m-0">{follower.FirstName + " " + follower.LastName}</p>
                              </div>
                            </Link>
                          </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 pb-5">
            <div
              className="d-flex flex-column justify-content-center w-100 mx-auto"
              id="d-flex-postcontainer-myprofile"
            >
              <CreatePost
                userDisplayname={props.userDisplayname}
                userInfo={userInfo}
              />
              <PostCard
                userDisplayname={props.userDisplayname}
                userInfo={userInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;