import React, { useEffect, useState } from "react";
import axios from "axios";
import getUserHeaders from "../helpers/getUserHeaders";
import noProfilePhoto from "../icons/noprofile.jpg";
import { Link } from "react-router-dom";
import Dotdotdot from "../icons/dotdotdot.svg?react";
import MessengerIcon from "../icons/messenger.svg?react";

const FriendsB = ({ currentUser, setChatRecipient, setShowChat }) => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const headers = getUserHeaders();

        try {
            const response = await axios.get(`/api/users/${currentUser.id}/friends`, { headers });
            setFriends(response.data);
        } catch (error) {
            console.error("Error fetching friends:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenChat = (friend) => {
        setChatRecipient(friend);
        setShowChat(true);
    };

    return (
        <div className="w-full shadow-md bg-light-b dark:bg-dark-b rounded-md mb-3 p-3">
            <div className="font-semibold text-xl mb-3">Your Friends</div>
            <hr className="w-full border-t border-light-c dark:border-dark-a mb-3" />

            {loading ? (
                <p>Loading friends...</p>
            ) : (
                <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-2">
                    {friends.length > 0 ? (
                        friends.map((friend, index) => (
                            <li className="flex items-center justify-between sm:flex-col sm:border sm:border-neutral sm:rounded-lg sm:overflow-hidden" key={friend.id}>
                                <div className="flex items-center sm:flex-col">
                                    <Link to={`/profile/${friend.id}`}>
                                        <img
                                            className="w-[79px] sm:w-44 aspect-square object-cover rounded-full sm:rounded-none cursor-pointer ring-1 sm:ring-0"
                                            src={friend.profilePhoto || noProfilePhoto}
                                            alt="profile photo"
                                            referrerPolicy="no-referrer"
                                            onError={(e) => {
                                                e.target.src = noProfilePhoto;
                                            }}
                                        />
                                    </Link>

                                    <div className="flex flex-col p-2 sm:w-44 sm:bg-light-b sm:dark:bg-dark-a sm:h-[112px] h-[88px]">
                                        <div className="truncate">
                                            <Link to={`/profile/${friend.id}`}>
                                                {(() => {
                                                    if (friend.displayName) {
                                                        return <span className="font-semibold break-words hover:underline">{friend.displayName}</span>;
                                                    } else if (friend.firstName && friend.lastName) {
                                                        return <span className="font-semibold break-words hover:underline">{`${friend.firstName} ${friend.lastName}`}</span>;
                                                    } else if (friend.firstName) {
                                                        return <span className="font-semibold break-words hover:underline">{friend.firstName}</span>;
                                                    } else if (friend.lastName) {
                                                        return <span className="font-semibold break-words hover:underline">{friend.lastName}</span>;
                                                    } else {
                                                        return null;
                                                    }
                                                })()}
                                            </Link>
                                        </div>
                                        <span className="sm:text-xs">0 mutual friends</span>
                                        <div className="flex sm:flex-col sm:gap-1">
                                            <button className="flex items-center justify-center w-28 sm:w-full bg-primaryDark dark:bg-primaryDark text-xs px-3 py-1 rounded-md" onClick={() => handleOpenChat(friend)}>
                                                <MessengerIcon className="fill-current w-4 h-4 mr-1" />
                                                Message
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <Dotdotdot className="w-4 visible sm:hidden fill-current" />
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

export default FriendsB;
