import React from "react";
import Posts from "./Posts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import noProfilePhoto from "../icons/noprofile.jpg";
import axios from "axios";
import PersonAddIcon from "../icons/person-add.svg?react";
import PersonCheckIcon from "../icons/person-check.svg?react";
import MessengerIcon from "../icons/messenger.svg?react";

const ProfilePage = ({ currentUser }) => {
    const [userToDisplay, setUserToDisplay] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getUser();
    }, [id]);

    const handleAddFriend = async (toUserId) => {
        const loggedUserToken = window.localStorage.getItem("loggedUserToken");
        if (loggedUserToken) {
            const headerConfig = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${loggedUserToken}`,
                },
            };

            const userObject = {
                toUserId: toUserId,
            };

            try {
                const result = await axios.post("/api/friend-requests", userObject, headerConfig);
                console.log(result.data);
                fetchData();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getUser = async () => {
        console.log("GETUSER");
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
        <div className="flex flex-col items-center p-6">
            {userToDisplay && (
                <>
                    <div className="flex flex-col items-center">
                        <img className="rounded-full overflow-hidden inline-block border-none w-28 h-28 sm:w-20 sm:h-20 object-cover ring-2 ring-black mb-2" src={userToDisplay.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                        {userToDisplay.displayName ? <span className="text-2xl font-bold">{userToDisplay.displayName}</span> : <span className="text-2xl font-bold">{`${userToDisplay.firstName} ${userToDisplay.lastName}`}</span>}
                        <span className="text-xs">{userToDisplay.email}</span>
                        {/* {userToDisplay.status === 'friend' &&
                        
                        }
                        {userToDisplay.status === 'notfriend' &&
                        
                        }                         */}
                        <div className="flex">
                            <button className="flex items-center bg-cyan-400 text-white text-xs px-3 py-1 rounded-md">
                                <PersonAddIcon className="fill-white w-5 h-5 mr-1" />
                                Add Friend
                            </button>
                            <button className="flex items-center bg-slate-400 text-white text-xs px-3 py-1 rounded-md">
                                <MessengerIcon className="fill-white w-4 h-4 mr-1" />
                                Message
                            </button>
                        </div>
                        <div className="flex">
                            <button className="flex items-center bg-slate-400 text-white text-xs px-3 py-1 rounded-md">
                                <PersonCheckIcon className="fill-white w-5 h-5 mr-1" />
                                Friends
                            </button>
                            <button className="flex items-center bg-cyan-400 text-white text-xs px-3 py-1 rounded-md">
                                <MessengerIcon className="fill-white w-4 h-4 mr-1" />
                                Message
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        {/* <Users user={currentUser} /> */}
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
