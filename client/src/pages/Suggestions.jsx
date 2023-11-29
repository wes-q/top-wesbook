import React, { useEffect, useState } from "react";
import noProfilePhoto from "../icons/noprofile.jpg";
import axios from "axios";
import getUserHeaders from "../helpers/getUserHeaders";
import { Link } from "react-router-dom";
import PersonAddIcon from "../icons/person-add.svg?react";
import MessengerIcon from "../icons/messenger.svg?react";

const Suggestions = ({ friends }) => {
    const [eligibleFriends, setEligibleFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const headers = getUserHeaders();
        try {
            const eligibleFriends = await axios.get("/api/users/eligible-friends", { headers });
            setEligibleFriends(eligibleFriends.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddFriend = async (toUserId) => {
        const url = "/api/friend-requests";
        const headers = getUserHeaders();
        const userObject = {
            toUserId: toUserId,
        };

        try {
            await axios.post(url, userObject, { headers });
            // Update the friend status in the eligibleFriends state
            setEligibleFriends((prevFriends) => prevFriends.map((friend) => (friend.id === toUserId ? { ...friend, friendRequestStatus: "success" } : friend)));
        } catch (error) {
            console.log(error);
            // Update the friend status in the eligibleFriends state
            setEligibleFriends((prevFriends) => prevFriends.map((friend) => (friend.id === toUserId ? { ...friend, friendRequestStatus: "error" } : friend)));
        }
    };

    return (
        <div className="w-full ring-1 bg-slate-200 rounded-md mb-3 text-black p-3">
            <div className="font-semibold text-xl mb-3">People you may know</div>
            <hr className="w-full border-t border-gray-300 mb-3" />

            {loading ? (
                <p>Loading friends...</p>
            ) : (
                <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-2">
                    {eligibleFriends.length > 0 ? (
                        eligibleFriends.map((friend) => (
                            <li className="flex items-center sm:flex-col sm:border sm:border-gray-400 sm:rounded-lg sm:overflow-hidden" key={friend.id}>
                                <Link to={`/profile/${friend.id}`}>
                                    <img
                                        className="w-[79px] sm:w-40 aspect-square object-cover rounded-full sm:rounded-none bg-slate-200 cursor-pointer ring-1 sm:ring-0"
                                        src={friend.profilePhoto || noProfilePhoto}
                                        alt="profile photo"
                                        referrerPolicy="no-referrer"
                                        onError={(e) => {
                                            e.target.src = noProfilePhoto;
                                        }}
                                    />
                                </Link>

                                <div className="flex flex-col p-2 sm:w-40 sm:bg-slate-300 sm:h-[112px] h-[88px]">
                                    <div className="truncate">
                                        <Link to={`/profile/${friend.id}`}>
                                            {(() => {
                                                if (friend.displayName) {
                                                    return <span className="text-base font-semibold break-words hover:underline">{friend.displayName}</span>;
                                                } else if (friend.firstName && friend.lastName) {
                                                    return <span className="text-base font-semibold break-words hover:underline">{`${friend.firstName} ${friend.lastName}`}</span>;
                                                } else if (friend.firstName) {
                                                    return <span className="text-base font-semibold break-words hover:underline">{friend.firstName}</span>;
                                                } else if (friend.lastName) {
                                                    return <span className="text-base font-semibold break-words hover:underline">{friend.lastName}</span>;
                                                } else {
                                                    return null;
                                                }
                                            })()}
                                        </Link>
                                    </div>
                                    <span className="sm:text-xs">0 mutual friends</span>
                                    <div className="flex sm:flex-col sm:gap-1">
                                        {friend.friendRequestStatus === "success" ? (
                                            <div className="text-green-600">Friend request sent!</div>
                                        ) : friend.friendRequestStatus === "error" ? (
                                            <div className="text-red-500">Error sending request.</div>
                                        ) : (
                                            <>
                                                <button className="flex items-center justify-center w-28 sm:w-full bg-cyan-400 text-white text-xs px-3 py-1 rounded-md mr-2" onClick={() => handleAddFriend(friend.id)}>
                                                    <PersonAddIcon className="fill-white w-5 h-5 mr-1" />
                                                    Add Friend
                                                </button>
                                                <button className="flex items-center justify-center w-28 sm:w-full bg-slate-400 text-white text-xs px-3 py-1 rounded-md">
                                                    <MessengerIcon className="fill-white w-4 h-4 mr-1" />
                                                    Message
                                                </button>
                                                {/* <button onClick={() => handleAddFriend(friend.id)}>Add Friend</button> */}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No friends found.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Suggestions;
