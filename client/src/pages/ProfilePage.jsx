import React from "react";
import Posts from "./Posts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./Profile";

const ProfilePage = ({ setNotification, currentUser, setCurrentUser }) => {
    const [userToDisplay, setUserToDisplay] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getUser();
    }, [id]);

    const getUser = async () => {
        const loggedUserToken = window.localStorage.getItem("loggedUserToken");
        let headers;
        if (loggedUserToken) {
            headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loggedUserToken}`,
            };
        }

        const url = `/api/users/${id}`;
        const user = await axios.get(url, { headers });
        console.log(user.data);
        setUserToDisplay(user.data);
    };

    return (
        <div>
            <Profile userToDisplay={userToDisplay} setNotification={setNotification} setUserToDisplay={setUserToDisplay} setCurrentUser={setCurrentUser} />
            <div className="p-3">
                <Posts userToDisplay={userToDisplay} currentUser={currentUser} postsOf="user" setNotification={setNotification} />
            </div>
        </div>
    );
};

export default ProfilePage;
