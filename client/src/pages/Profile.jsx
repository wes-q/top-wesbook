import noProfilePhoto from "../icons/noprofile.jpg";
import defaultCoverPhoto from "../icons/default-cover.png";
import defaultCoverVert from "../icons/default-cover-vert.png";
import PersonAddIcon from "../icons/person-add.svg?react";
import PersonCheckIcon from "../icons/person-check.svg?react";
import MessengerIcon from "../icons/messenger.svg?react";
import PersonRemoveIcon from "../icons/person-remove.svg?react";
import CameraIcon from "../icons/camera.svg?react";

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

    const handleUploadCoverPhoto = () => {
        alert();
    };

    if (!userToDisplay) {
        return <p>loading...</p>;
    }

    return (
        <>
            <div class="relative mb-[80px]">
                <img src={defaultCoverPhoto} alt="Cover Photo" className="w-full h-36 object-cover" />
                <button className="absolute bottom-3 right-3 opacity-70 bg-slate-600 text-white text-xs px-2 py-1 rounded-md" onClick={handleUploadCoverPhoto}>
                    <CameraIcon className="w-5 h-5 fill-white cursor-pointer" />
                </button>
                <div className="absolute w-32 h-32 left-1/2 transform -translate-x-1/2 top-[80px] ring-2 ring-black rounded-full">
                    <img src={userToDisplay.profilePhoto || noProfilePhoto} alt="Circle Image" className="w-32 h-32 rounded-full" /> {/* height of box - half of circle = top margin */}
                    <button className="absolute right-0 bottom-0 opacity-100 bg-slate-700 text-white text-xs px-2 py-1 rounded-md" onClick={handleUploadCoverPhoto}>
                        <CameraIcon className="w-5 h-5 fill-white cursor-pointer" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center mb-4">
                {userToDisplay.displayName ? <span className="text-2xl font-bold">{userToDisplay.displayName}</span> : <span className="text-2xl font-bold">{`${userToDisplay.firstName} ${userToDisplay.lastName}`}</span>}
                <span className="text-xs">{userToDisplay.email}</span>
                <span className="text-xs mb-4">{userToDisplay.totalFriends} friends</span>
                {userToDisplay.status === "friend" && (
                    <div className="flex">
                        <button className="flex items-center bg-slate-400 text-white text-xs px-3 py-1 rounded-md mr-2 cursor-default">
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
        </>
    );
};

export default Profile;
