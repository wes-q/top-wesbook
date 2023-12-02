import React from "react";
import Posts from "./Posts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./Profile";
import getUserHeaders from "../helpers/getUserHeaders";
import Friends from "./Friends";
import AboutUser from "./AboutUser";

const ProfilePage = ({ setNotification, currentUser, setCurrentUser }) => {
    const [userToDisplay, setUserToDisplay] = useState([]);
    const [usersFriends, setUsersFriends] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        getUser();
        getUsersFriends();
    }, [userId]);

    const headers = getUserHeaders();

    const getUser = async () => {
        const url = `/api/users/${userId}`;
        const user = await axios.get(url, { headers });
        setUserToDisplay(user.data);
    };

    const getUsersFriends = async () => {
        const url = `/api/users/${userId}/friends`;
        const friends = await axios.get(url, { headers });
        setUsersFriends(friends.data);
    };

    return (
        <div className="sm:px-96">
            <Profile userToDisplay={userToDisplay} setNotification={setNotification} setUserToDisplay={setUserToDisplay} setCurrentUser={setCurrentUser} />
            <div className="sm:flex sm:gap-4 p-3 sm:p-0">
                <div className="sm:w-2/3">
                    <div className="sm:sticky sm:top-16">
                        <AboutUser userToDisplay={userToDisplay} />
                        <Friends usersFriends={usersFriends} userId={userId} currentUser={currentUser} />
                    </div>
                </div>
                <div className="">
                    <Posts userToDisplay={userToDisplay} currentUser={currentUser} postsOf="user" setNotification={setNotification} />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
