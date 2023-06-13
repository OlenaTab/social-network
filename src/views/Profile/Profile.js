import React from 'react';
import Topnav from '../Topnav';
import CreatePost from '../../components/CreatePost/CreatePost';
import PostContainer from '../../components/Card/PostCard';
import AvatarSquare from '../../components/Avatar/AvatarSquare';
import './Profile.css';
import ChangeProfilePicModal from '../../components/Modal/ChangeProfilePicModal';

function Profile(props) {
  return (
    <div>
      <Topnav />
      <div className="container-fluid">
        <section>
          <div className="container py-5 ">
            <div className="bg-white" id="bg-white">
              <div className="panel profile-cover p-4">
                <div className="card">
                  <div className="card-body p-4">
                    <div className="d-flex text-black">
                      <div className="flex-shrink-0">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                          alt="Generic placeholder image"
                          className="img-fluid"
                        />
                        <i
                          className="fas fa-images fs-5 text-success pointer position-absolute bottom-0 start-0 ms-2"
                          data-bs-toggle="modal"
                          data-bs-target="#changeProfilePicModal"
                        ></i>
                      </div>

                      <div className="flex-grow-1 ms-3">
                        <h5 className="mb-1">{props.username}</h5>
                        <div className="d-flex justify-content-start rounded-3 p-2 mb-2">
                          <div>
                            <p className="small text-muted mb-1">Followers</p>
                            <p className="mb-0">41</p>
                          </div>
                          <div className="px-3">
                            <p className="small text-muted mb-1">Following</p>
                            <p className="mb-0">976</p>
                          </div>
                        </div>
                        <div className="d-flex pt-1">
                          <button
                            type="button"
                            className="btn btn-outline-primary me-1 flex-grow-1"
                          >
                            Chat
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary flex-grow-1"
                          >
                            Follow
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ChangeProfilePicModal username={props.username} />
                <div className="row justify-content-evenly">
                    <div className="col-12 col-lg-3">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-followersbox">
                            <div className="bg-white rounded border shadow p-3">
                                <ul  >
                                    <li className="dropdown-item p-1 rounded">
                                        <div className="p-2">
                                            <p className="m-0"><strong>Intro</strong></p>
                                        </div>
                                        <div>
                                            <p className="m-0">Bio</p>
                                        </div>
                                    </li>
                                    <li className="dropdown-item p-1">
                                        <a href="#" className="btn btn-primary btn-sm d-flex justify-content-center align-items-center"> Add bio</a>
                                    </li>
                                    <li className="dropdown-item p-1 rounded">
                                        <span><i className="fas fa-user"></i> <span className="name">Nickname</span></span>
                                    </li>
                                    <li className="my-2 p-1">
                                        <span><i className="fas fa-edit"></i> <span className="name">{props.email}</span></span>
                                    </li>
                                    <li className="dropdown-item p-1 rounded">
                                        <span><i className="fas fa-birthday-cake"></i> <span className="name">{props.dob}</span></span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white rounded border shadow p-3">
                                <div>
                                    <p className="m-0">Followers</p>
                                </div>
                                <div className="follow-box-content p-1 m-0 d-flex">
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Jacob</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Gin</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Ashley</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Amanda</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Noah</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="bg-white rounded border shadow p-3">
                                <div>
                                    <p className="m-0">Following</p>
                                </div>
                                <div className="follow-box-content p-1 m-0 d-flex">
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Jacob</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Jacob</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Jacob</p>
                                        </div>
                                    </a>
                                    <a href="#" className="d-flex align-items-center text-decoration-none text-dark">
                                        <div className="fellows d-flex align-items-center">
                                            <AvatarSquare/>
                                        </div>
                                        <div className="fellows d-flex align-items-center">
                                            <p className="m-0">Jacob</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 pb-5">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-myprofile">
                            <CreatePost username={props.username}/>
                            <PostContainer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
