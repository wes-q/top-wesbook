import { useEffect, useState } from "react";
import userService from "../services/users";
import noProfilePhoto from "../icons/noprofile.jpg";

const Users = ({ user }) => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const users = await userService.getAll();
        return users;
    };

    useEffect(() => {
        const fetchData = async () => {
            if (user && user.id) {
                const usersData = await getUsers();
                const filteredUsers = usersData.filter((x) => x.id !== user.id);
                setUsers(filteredUsers);
            }
        };

        fetchData();
    }, [user]);

    const handleAddFriend = async () => {
        const result = await axios.post("/api/friend-requests");
        console.log(result.data);
    };

    return (
        <>
            <div className="text-xl">Other amazing users of this app:</div>
            <div className="">
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
            </div>

            <div className="text-xl">Your pending friend requests:</div>
        </>
    );
};

export default Users;
