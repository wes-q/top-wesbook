import React from "react";
import Posts from "./Posts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./Profile";
import getUserHeaders from "../helpers/getUserHeaders";

const ProfilePage = ({ setNotification, currentUser, setCurrentUser }) => {
    const [userToDisplay, setUserToDisplay] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        getUser();
    }, [userId]);

    const getUser = async () => {
        const url = `/api/users/${userId}`;
        const headers = getUserHeaders();
        const user = await axios.get(url, { headers });
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
