import { useEffect, useState } from "react";
import noProfilePhoto from "../icons/noprofile.jpg";
import axios from "axios";
import getUserHeaders from "../helpers/getUserHeaders";

const FriendsC = ({ currentUser, setChatRecipient, setShowChat }) => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        fetchData();
    }, [currentUser]);

    const fetchData = async () => {
        const headers = getUserHeaders();

        try {
            const friends = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/${currentUser.id}/friends`, { headers });
            setFriends(friends.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenChat = (friend) => {
        setChatRecipient(friend);
        setShowChat(true);
    };

    return (
        <div className="wrapper sticky top-20">
            <div className="bg-transparent p-2 rounded-md w-72 mb-6 max-h-[710px] content custom-scrollbar">
                <div className="px-2">Contacts</div>
                {friends.length > 0 ? (
                    <>
                        <ul className="flex flex-col w-full">
                            {friends.map((friend) => (
                                <li key={friend.id}>
                                    <div className="flex gap-2 items-center hover:text-primary hover:dark:text-primaryDark hover:bg-light-b hover:dark:bg-dark-b w-full rounded-md transition-colors p-2 cursor-pointer" onClick={() => handleOpenChat(friend)}>
                                        <img className="rounded-full w-8 h-8 object-cover" src={friend.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping-slow ease-out absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                            <span className="relative rounded-full h-3 w-3 bg-green-500"></span>
                                        </span>
                                        <span className="truncate">{friend.displayName || friend.firstName}</span>
                                    </div>
                                    {/* <Link to={`/profile/${friend.id}`}>
                                        <div className="flex gap-2 items-center hover:text-primary hover:dark:text-primaryDark hover:bg-light-b hover:dark:bg-dark-b w-full rounded-md transition-colors p-2 cursor-pointer">
                                            <img className="rounded-full w-8 h-8 object-cover" src={friend.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping-slow ease-out absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                                <span className="relative rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                            <span className="truncate">{friend.displayName || friend.firstName}</span>
                                        </div>
                                    </Link> */}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>No friends yet.</p>
                )}
            </div>
        </div>
    );
};

export default FriendsC;
