import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import CreatePost from '../../components/CreatePost/CreatePost'
import PostCard from '../../components/Card/PostCard';
import Avatar from '../../components/Avatar/Avatar';
import './Home.css'
import Topnav from '../Topnav';

function Home(props) {
    // use selector for logged in users
    const dispatch = useDispatch();
    const loggedinUsers = useSelector((state) => state.loggedinUsers);
    const userInfo = useSelector((state) => state.userInfo);
    const allusers = useSelector((state) => state.allUsers);

    const displayChatUsers = () => {
        if (!allusers) {
            return null;
        }

        return allusers
            .filter((user) => user.UserName !== userInfo.UserName)
            .map((user, index) => {
                let isUserOnline = false
                if (loggedinUsers) {
                    isUserOnline = loggedinUsers.includes(user.UserName);
                }
                const statusClass = isUserOnline ? "bg-success" : "";
            return (
                <div key={`${user.UserName}-${index}`}>
                    <ul className="list-group">
                        <li className={`dropdown-item rounded my-2 px-0 ${statusClass}`} type="button">
                            <div className="d-flex align-items-center mx-2 chat-avatar">
                                <div className="position-relative">
                                    <img src={user.Avatar} alt="avatar" className="rounded-circle me-2" />
                                    <span className={`position-absolute bottom-0 translate-middle border border-light rounded-circle-sm p-1 ${statusClass}`}>
                                        <span className="visually-hidden"></span>
                                    </span>
                                </div>
                                <p className="m-0">{user.FirstName + " " + user.LastName}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            );
        });
    };
    
    return (
        
        <div>
            <Topnav userDisplayname={props.userDisplayname} allusers={props.allusers} socket={props.socket}/>
            <div className="container-fluid">
                <div className="row justify-content-evenly">
                    <div className="col-12 col-lg-6 pb-5">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-myhomepage">
                            <CreatePost userDisplayname={props.userDisplayname}/>
                            <PostCard userDisplayname={props.userDisplayname} />
                        </div>
                    </div>
                    <div className="col-12 col-lg-3">
                        <div className="d-flex flex-column justify-content-center w-100 mx-auto" id="d-flex-postcontainer-contactsbox"> 
                            <div className="bg-white rounded border shadow p-3">
                                <div>
                                    <div className="my-3 d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center mx-2 chat-avatar">
                                            <div className="position-relative">
                                                <Avatar userDisplayname={props.userDisplayname} />  
                                            </div>
                                            <p className="m-0"><strong>{props.userDisplayname}</strong></p>
                                        </div>
                                    </div>
                                    <hr />
                                    <p className="text-muted fs-5 m-0">Contacts</p>
                                    {/* <span className={`status ${isUserOnline ? 'online' : 'offline'}`}></span> */}
                                    {displayChatUsers()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
