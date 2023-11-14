import noProfilePhoto from "../icons/noprofile.jpg";
import defaultCoverPhoto from "../icons/default-cover.png";
import PersonAddIcon from "../icons/person-add.svg?react";
import PersonCheckIcon from "../icons/person-check.svg?react";
import MessengerIcon from "../icons/messenger.svg?react";
import PersonRemoveIcon from "../icons/person-remove.svg?react";

const Profile = ({ userToDisplay }) => {
    const handleAddFriend = async (toUserId) => {
        const loggedUserToken = window.localStorage.getItem("loggedUserToken");
        if (loggedUserToken) {
            const headerConfig = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${loggedUserToken}`,
                },
            };

            const userObject = {
                toUserId: toUserId,
            };

            try {
                const result = await axios.post("/api/friend-requests", userObject, headerConfig);
                console.log(result.data);
                getUser();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleCancel = async (toUserId) => {
        const loggedUserToken = window.localStorage.getItem("loggedUserToken");
        if (loggedUserToken) {
            const headerConfig = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${loggedUserToken}`,
                },
            };

            const userObject = {};

            try {
                const result = await axios.post(`/api/friend-requests/${toUserId}/cancel`, userObject, headerConfig);
                console.log(result.data);
                getUser();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            {userToDisplay && (
                <div className="flex flex-col items-center mb-4">
                    <img src={defaultCoverPhoto} alt="cover photo" />
                    <img className="rounded-full overflow-hidden inline-block border-none w-28 h-28 sm:w-20 sm:h-20 object-cover ring-2 ring-black mb-4" src={userToDisplay.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                    {userToDisplay.displayName ? <span className="text-2xl font-bold">{userToDisplay.displayName}</span> : <span className="text-2xl font-bold">{`${userToDisplay.firstName} ${userToDisplay.lastName}`}</span>}
                    <span className="text-xs mb-4">{userToDisplay.email}</span>
                    {userToDisplay.status === "friend" && (
                        <div className="flex">
                            <button className="flex items-center bg-slate-400 text-white text-xs px-3 py-1 rounded-md mr-2">
                                <PersonCheckIcon className="fill-white w-5 h-5 mr-1" />
                                Friends
                            </button>
                            <button className="flex items-center bg-cyan-400 text-white text-xs px-3 py-1 rounded-md">
                                <MessengerIcon className="fill-white w-4 h-4 mr-1" />
                                Message
                            </button>
                        </div>
                    )}
                    {userToDisplay.status === "notFriend" && (
                        <div className="flex">
                            <button className="flex items-center bg-cyan-400 text-white text-xs px-3 py-1 rounded-md mr-2" onClick={() => handleAddFriend(userToDisplay.id)}>
                                <PersonAddIcon className="fill-white w-5 h-5 mr-1" />
                                Add Friend
                            </button>
                            <button className="flex items-center bg-slate-400 text-white text-xs px-3 py-1 rounded-md">
                                <MessengerIcon className="fill-white w-4 h-4 mr-1" />
                                Message
                            </button>
                        </div>
                    )}
                    {userToDisplay.status === "pending" && (
                        <div className="flex">
                            <button className="flex items-center bg-cyan-400 text-white text-xs px-3 py-1 rounded-md mr-2" onClick={() => handleCancel(userToDisplay.id)}>
                                <PersonRemoveIcon className="fill-white w-5 h-5 mr-1" />
                                Request sent
                            </button>
                            <button className="flex items-center bg-slate-400 text-white text-xs px-3 py-1 rounded-md">
                                <MessengerIcon className="fill-white w-4 h-4 mr-1" />
                                Message
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Profile;
