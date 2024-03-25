import { useEffect, useState } from "react";
import noProfilePhoto from "../icons/noprofile.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import getUserHeaders from "../helpers/getUserHeaders";

const Users = ({ user }) => {
    const [friends, setFriends] = useState([]);
    const [eligibleFriends, setEligibleFriends] = useState([]);
    const [pendingFriends, setPendingFriends] = useState([]);
    const [incomingFriends, setIncomingFriends] = useState([]);

    useEffect(() => {
        fetchData();
    }, [user]);

    const fetchData = async () => {
        const headers = getUserHeaders();

        try {
            const eligibleFriends = await axios.get("/api/users/eligible-friends", { headers });
            setEligibleFriends(eligibleFriends.data);

            const pendingFriends = await axios.get("/api/users/pending-friends", { headers });
            setPendingFriends(pendingFriends.data);

            const friends = await axios.get(`/api/users/${user.id}/friends`, { headers });
            setFriends(friends.data);

            const incomingFriends = await axios.get("/api/users/incoming-friends", { headers });
            setIncomingFriends(incomingFriends.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddFriend = async (toUserId) => {
        const url = "/api/friend-requests";
        const headers = getUserHeaders();
        const userObject = {
            toUserId: toUserId,
        };

        try {
            const result = await axios.post(url, userObject, { headers });
            console.log(result.data);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleAcceptFriend = async (toUserId) => {
        const url = `/api/friend-requests/${toUserId}/accept`;
        const headers = getUserHeaders();

        const object = {};
        try {
            const result = await axios.put(url, object, { headers });
            console.log(result.data);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="bg-gray-500 border border-black p-2 rounded-md w-72 mb-6">
                <div className="text-lg">Other amazing users of this app:</div>
                <div className="">
                    {eligibleFriends.length > 0 ? (
                        <ul className="flex flex-col w-full text-sm">
                            {eligibleFriends.map((user) => (
                                <li key={user.id}>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2 items-center">
                                            <Link to={`/profile/${user.id}`}>
                                                <img
                                                    className="rounded-full w-8 h-8 object-cover"
                                                    src={user.profilePhoto || noProfilePhoto}
                                                    alt="profile photo"
                                                    referrerPolicy="no-referrer"
                                                    onError={(e) => {
                                                        e.target.src = noProfilePhoto;
                                                    }}
                                                />
                                            </Link>
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping-slow ease-out absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                                <span className="relative rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                            <Link to={`/profile/${user.id}`}>
                                                <span className="hover:underline">{user.displayName || user.firstName}</span>
                                            </Link>
                                        </div>
                                        <button className="bg-gray-200 text-black hover:bg-gray-300 px-2 py-1 rounded-md border border-black transition-colors" onClick={() => handleAddFriend(user.id)}>
                                            Add Friend
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>

            <div className="bg-gray-500 border border-black p-2 rounded-md w-72 mb-6">
                <div className="text-lg">Outgoing friend requests:</div>
                <div>
                    {pendingFriends.length > 0 ? (
                        <ul className="flex flex-col w-full text-sm">
                            {pendingFriends.map((user) => (
                                <li key={user.id}>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2 items-center">
                                            <Link to={`/profile/${user.id}`}>
                                                <img className="rounded-full w-8 h-8 object-cover" src={user.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                                            </Link>
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping-slow ease-out absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                                <span className="relative rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                            <Link to={`/profile/${user.id}`}>
                                                <span className="hover:underline">{user.displayName || user.firstName}</span>
                                            </Link>
                                        </div>
                                        <span className="italic text-xs">Pending</span>
                                        {/* {user.status ? <p>Status: Pending</p> : isRejected ? <p>Status: Rejected</p> : <p>Status: No Requests</p>} */}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>

            <div className="bg-gray-500 border border-black p-2 rounded-md w-72 mb-6">
                <div className="text-lg">Incoming friend requests:</div>
                <div>
                    {incomingFriends.length > 0 ? (
                        <ul className="flex flex-col w-full text-sm">
                            {incomingFriends.map((user) => (
                                <li key={user.id}>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2 items-center">
                                            <Link to={`/profile/${user.id}`}>
                                                <img className="rounded-full w-8 h-8 object-cover" src={user.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                                            </Link>
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping-slow ease-out absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                                <span className="relative rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                            <Link to={`/profile/${user.id}`}>
                                                <span className="hover:underline">{user.displayName || user.firstName}</span>
                                            </Link>
                                        </div>
                                        <div>
                                            <button className="bg-gray-200 text-black hover:bg-gray-300 px-2 py-1 rounded-md border border-black transition-colors" onClick={() => handleAcceptFriend(user.id)}>
                                                Accept
                                            </button>
                                            <button className="bg-gray-200 text-black hover:bg-gray-300 px-2 py-1 rounded-md border border-black transition-colors" onClick={() => handleRejectFriend(user.id)}>
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>

            <div className="bg-gray-500 border border-black p-2 rounded-md w-52 mb-6">
                <div className="text-lg">Friends:</div>
                <div className="">
                    {friends.length > 0 ? (
                        <ul className="flex flex-col w-full text-sm">
                            {friends.map((user) => (
                                <li key={user.id}>
                                    <div className="flex gap-2 items-center">
                                        <Link to={`/profile/${user.id}`}>
                                            <img className="rounded-full w-8 h-8 object-cover" src={user.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                                        </Link>
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping-slow ease-out absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                            <span className="relative rounded-full h-3 w-3 bg-green-500"></span>
                                        </span>
                                        <Link to={`/profile/${user.id}`}>
                                            <span className="hover:underline">{user.displayName || user.firstName}</span>
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Users;
