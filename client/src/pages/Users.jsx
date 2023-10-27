import { useEffect, useState } from "react";
import noProfilePhoto from "../icons/noprofile.jpg";
import axios from "axios";

const Users = ({ user }) => {
    const [users, setUsers] = useState([]);

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
                setUsers(eligibleFriends.data);
            }
        }
    };

    const handleAddFriend = async () => {
        const result = await axios.post("/api/friend-requests");
        console.log(result.data);
    };

    return (
        <>
            <div className="text-xl">Other amazing users of this app:</div>
            <div className="">
                {users.length > 0 ? (
                    <ul className="flex flex-col w-72">
                        {users.map((user) => (
                            <li key={user.id} className="flex justify-between">
                                <div className="flex gap-2 items-center">
                                    <img className="rounded-full w-8" src={user.profilePhoto || noProfilePhoto} alt="profile photo" />
                                    <span>{user.displayName || user.firstName}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users found.</p>
                )}
            </div>

            <div className="text-xl">Your pending friend requests:</div>
        </>
    );
};

export default Users;
