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
        <>
            <div className="bg-gray-500 h-fit border border-black p-2 rounded-md w-52 mb-6 fixed top-16 right-0 overflow-y-auto">
                <div className="text-lg">Friends:</div>
                <div className="">
                    {friends.length > 0 ? (
                        <ul className="flex flex-col w-full text-sm">
                            {friends.map((friend) => (
                                <li key={friend.id}>
                                    <div className="flex gap-2 items-center">
                                        <Link to={`/profile/${friend.id}`}>
                                            <img className="rounded-full w-8 h-8 object-cover" src={friend.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                                        </Link>
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping-slow ease-out absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                            <span className="relative rounded-full h-3 w-3 bg-green-500"></span>
                                        </span>
                                        <Link to={`/profile/${friend.id}`}>
                                            <span className="hover:underline">{friend.displayName || friend.firstName}</span>
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No friends yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default FriendsC;
