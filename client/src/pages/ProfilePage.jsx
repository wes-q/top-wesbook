import React from "react";
import Posts from "./Posts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import noProfilePhoto from "../icons/noprofile.jpg";
import axios from "axios";

const ProfilePage = ({ currentUser }) => {
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
        const user = await axios.get(url, headers);
        console.log(user.data);
        setUserToDisplay(user.data);
    };

    return (
        <div className="flex flex-col items-center p-6">
            {userToDisplay && (
                <>
                    <div className="flex flex-col items-center">
                        <img className="rounded-full overflow-hidden inline-block border-none w-28 h-28 sm:w-20 sm:h-20 object-cover ring-2 ring-black mb-2" src={userToDisplay.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                        <span className="text-2xl font-bold">{`${userToDisplay.firstName} ${userToDisplay.lastName}` || userToDisplay.displayName}</span>
                        <span className="text-xs">{userToDisplay.email}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        {/* <Users /> */}
                        {/* <PostsOfUser currentUser={currentUser} /> */}
                        <Posts currentUser={currentUser} postsOf="user" />
                        {/* <span>{currentUser.id}</span> */}
                        {/* <span>{userToDisplay.id}</span> */}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfilePage;
