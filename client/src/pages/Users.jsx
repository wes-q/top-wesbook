import { useEffect, useState } from "react";
import noProfilePhoto from "../icons/noprofile.jpg";
import axios from "axios";

const Users = ({ user }) => {
    const [eligibleFriends, setEligibleFriends] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        console.log("USEEFFECTX");
        fetchData();
    }, [user]);

    const fetchData = async () => {
        if (user && user.id) {
            const loggedUserToken = window.localStorage.getItem("loggedUserToken");
            if (loggedUserToken) {
                console.log("THERE IS LOGGED USER TOKEN");
                const headerConfig = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${loggedUserToken}`,
                    },
                };

                const eligibleFriends = await axios.get("/api/users/eligible-friends", headerConfig);
                setEligibleFriends(eligibleFriends.data);

                const friends = await axios.get("/api/users/friends", headerConfig);
                setFriends(friends.data);
            }
        }
    };

    const handleAddFriend = async () => {
        const result = await axios.post("/api/friend-requests");
        console.log(result.data);
    };

    return (
        <div className="p-6">
            <div className="bg-gray-500 border border-black p-2 rounded-md w-96 mb-6">
                <div className="text-lg">Other amazing users of this app:</div>
                <div className="">
                    {eligibleFriends.length > 0 ? (
                        <ul className="flex flex-col w-72 text-sm">
                            {eligibleFriends.map((user) => (
                                <li key={user.id} className="flex items-center gap-4">
                                    <div className="flex gap-2 items-center">
                                        <img className="rounded-full w-8" src={user.profilePhoto || noProfilePhoto} alt="profile photo" />
                                        <span>{user.displayName || user.firstName}</span>
                                    </div>
                                    <span class="relative flex h-3 w-3">
                                        <span class="animate-ping-slow ease-out absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                        <span class="relative rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    <button className="bg-gray-200 text-black hover:bg-gray-300 px-2 py-1 rounded-md border border-black transition-colors" onClick={handleAddFriend}>
                                        Add Friend
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>
            {/* 
            <div className="bg-gray-500 border border-black p-2 rounded-md w-96 mb-6">
                <div className="text-lg">Your pending friend requests:</div>
                <div className="">
                    {users.length > 0 ? (
                        <ul className="flex flex-col w-72 text-sm">
                            {users.map((user) => (
                                <li key={user.id} className="flex items-center gap-4">
                                    <div className="flex gap-2 items-center">
                                        <img className="rounded-full w-8" src={user.profilePhoto || noProfilePhoto} alt="profile photo" />
                                        <span>{user.displayName || user.firstName}</span>
                                    </div>
                                    <span class="relative flex h-3 w-3">
                                        <span class="animate-ping-slow ease-out absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                        <span class="relative rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    <span className="italic">Pending request</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>

            <div className="bg-gray-500 border border-black p-2 rounded-md w-96 mb-6">
                <div className="text-lg">Rejected friend requests:</div>
                <div className="">
                    {users.length > 0 ? (
                        <ul className="flex flex-col w-72 text-sm">
                            {users.map((user) => (
                                <li key={user.id} className="flex items-center gap-4">
                                    <div className="flex gap-2 items-center">
                                        <img className="rounded-full w-8" src={user.profilePhoto || noProfilePhoto} alt="profile photo" />
                                        <span>{user.displayName || user.firstName}</span>
                                    </div>
                                    <span class="relative flex h-3 w-3">
                                        <span class="animate-ping-slow ease-out absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                        <span class="relative rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    <span className="text-red-400">Rejected</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div> */}

            <div className="bg-gray-500 border border-black p-2 rounded-md w-52 mb-6">
                <div className="text-lg">Friends:</div>
                <div className="">
                    {friends.length > 0 ? (
                        <ul className="flex flex-col w-full text-sm">
                            {friends.map((user) => (
                                <li key={user.id} className="flex items-center gap-4">
                                    <div className="flex gap-2 items-center">
                                        <img className="rounded-full w-8" src={user.profilePhoto || noProfilePhoto} alt="profile photo" />
                                        <span>{user.displayName || user.firstName}</span>
                                    </div>
                                    <span class="relative flex h-3 w-3">
                                        <span class="animate-ping-slow ease-out absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                        <span class="relative rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Users;
