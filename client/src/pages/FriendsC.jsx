import { useEffect, useState } from "react";
import noProfilePhoto from "../icons/noprofile.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import getUserHeaders from "../helpers/getUserHeaders";

const FriendsC = ({ currentUser }) => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        fetchData();
    }, [currentUser]);

    const fetchData = async () => {
        const headers = getUserHeaders();

        try {
            const friends = await axios.get(`/api/users/${currentUser.id}/friends`, { headers });
            setFriends(friends.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="wrapper sticky top-16">
            <div className="bg-slate-600 p-2 rounded-md w-72 mb-6 max-h-[710px] content custom-scrollbar">
                <div className="px-2 text-base">Contacts</div>
                <div className="">
                    {friends.length > 0 ? (
                        <>
                            <ul className="flex flex-col w-full text-sm">
                                {friends.map((friend) => (
                                    <li key={friend.id}>
                                        {/* <div className="flex gap-2 items-center"> */}
                                        <div className="flex gap-2 items-center hover:text-cyan-400 hover:bg-slate-700 w-full rounded-md transition-colors p-2 cursor-pointer">
                                            <Link to={`/profile/${friend.id}`}>
                                                <img className="rounded-full w-8 h-8 object-cover" src={friend.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                                            </Link>
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping-slow ease-out absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                                <span className="relative rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                            <Link to={`/profile/${friend.id}`}>
                                                <span className="tracking-wide truncate">{friend.displayName || friend.firstName}</span>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <ul className="flex flex-col w-full text-sm">
                                {friends.map((friend) => (
                                    <li key={friend.id}>
                                        {/* <div className="flex gap-2 items-center"> */}
                                        <div className="flex gap-2 items-center hover:text-cyan-400 hover:bg-slate-700 w-full rounded-md transition-colors p-2 cursor-pointer">
                                            <Link to={`/profile/${friend.id}`}>
                                                <img className="rounded-full w-8 h-8 object-cover" src={friend.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                                            </Link>
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping-slow ease-out absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                                <span className="relative rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                            <Link to={`/profile/${friend.id}`}>
                                                <span className="tracking-wide truncate">{friend.displayName || friend.firstName}</span>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <ul className="flex flex-col w-full text-sm">
                                {friends.map((friend) => (
                                    <li key={friend.id}>
                                        {/* <div className="flex gap-2 items-center"> */}
                                        <div className="flex gap-2 items-center hover:text-cyan-400 hover:bg-slate-700 w-full rounded-md transition-colors p-2 cursor-pointer">
                                            <Link to={`/profile/${friend.id}`}>
                                                <img className="rounded-full w-8 h-8 object-cover" src={friend.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                                            </Link>
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping-slow ease-out absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                                <span className="relative rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                            <Link to={`/profile/${friend.id}`}>
                                                <span className="tracking-wide truncate">{friend.displayName || friend.firstName}</span>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>No friends yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FriendsC;
