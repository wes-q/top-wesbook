import { useEffect, useState } from "react";
import noProfilePhoto from "../icons/noprofile.jpg";
import axios from "axios";
import getUserHeaders from "../helpers/getUserHeaders";
import { Link } from "react-router-dom";
import CheckIcon from "../icons/check-google.svg?react";
import XIcon from "../icons/x-close-google.svg?react";
import MessengerIcon from "../icons/messenger.svg?react";
import PersonRemoveIcon from "../icons/person-remove.svg?react";

const Requests = () => {
    const [loading, setLoading] = useState(true);
    const [incomingFriends, setIncomingFriends] = useState([]);
    const [pendingFriends, setPendingFriends] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const headers = getUserHeaders();
        try {
            const incomingFriends = await axios.get("/api/users/incoming-friends", { headers });
            setIncomingFriends(incomingFriends.data);

            const pendingFriends = await axios.get("/api/users/pending-friends", { headers });
            setPendingFriends(pendingFriends.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptFriend = async (toUserId) => {
        const url = `/api/friend-requests/${toUserId}/accept`;
        const headers = getUserHeaders();

        const object = {};
        try {
            const result = await axios.put(url, object, { headers });
            // console.log(result.data);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleRejectFriend = async (toUserId) => {
        const url = `/api/friend-requests/${toUserId}/reject`;
        const headers = getUserHeaders();

        const object = {};
        try {
            const result = await axios.put(url, object, { headers });
            // console.log(result.data);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = async (toUserId) => {
        const url = `/api/friend-requests/${toUserId}/cancel`;
        const headers = getUserHeaders();
        const userObject = {};

        try {
            const result = await axios.post(url, userObject, { headers });
            // console.log(result.data);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="w-full ring-1 bg-slate-200 rounded-md mb-3 text-black p-3">
                <div className="font-semibold text-xl mb-3">Friend Requests</div>
                <hr className="w-full border-t border-gray-300 mb-3" />

                {loading ? (
                    <p>Loading friends...</p>
                ) : (
                    <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-2">
                        {incomingFriends.length > 0 ? (
                            incomingFriends.map((friend) => (
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
                                                <span className="text-base font-semibold break-words cursor-pointer hover:underline">{friend.displayName || friend.firstName + " " + friend.lastName}</span>
                                            </Link>
                                        </div>
                                        <span className="sm:text-xs">0 mutual friends</span>
                                        <div className="flex sm:flex-col sm:gap-1">
                                            <button className="flex items-center justify-center w-28 sm:w-full bg-cyan-400 text-white text-xs px-3 py-1 rounded-md mr-2" onClick={() => handleAcceptFriend(friend.id)}>
                                                <CheckIcon className="fill-white w-5 h-5 mr-1" />
                                                Confirm
                                            </button>
                                            <button className="flex items-center justify-center w-28 sm:w-full bg-slate-400 text-white text-xs px-3 py-1 rounded-md" onClick={() => handleRejectFriend(friend.id)}>
                                                <XIcon className="fill-white w-5 h-5 mr-1" />
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No requests yet.</p>
                        )}
                    </ul>
                )}
            </div>

            <div className="w-full ring-1 bg-slate-200 rounded-md mb-3 text-black p-3">
                <div className="font-semibold text-xl mb-3">Requests Sent</div>
                <hr className="w-full border-t border-gray-300 mb-3" />

                {loading ? (
                    <p>Loading friends...</p>
                ) : (
                    <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-2">
                        {pendingFriends.length > 0 ? (
                            pendingFriends.map((friend) => (
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
                                            <button className="flex items-center justify-center w-28 sm:w-full bg-slate-400 text-white text-xs px-3 py-1 rounded-md mr-2" onClick={() => handleCancel(friend.id)}>
                                                <PersonRemoveIcon className="fill-white w-5 h-5 mr-1" />
                                                Cancel
                                            </button>
                                            <button className="flex items-center justify-center w-28 sm:w-full bg-cyan-400 text-white text-xs px-3 py-1 rounded-md">
                                                <MessengerIcon className="fill-white w-4 h-4 mr-1" />
                                                Message
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No requests sent.</p>
                        )}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Requests;
