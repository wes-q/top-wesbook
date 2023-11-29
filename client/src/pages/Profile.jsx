import noProfilePhoto from "../icons/noprofile.jpg";
import defaultCoverPhoto from "../icons/default-cover.png";
import PersonAddIcon from "../icons/person-add.svg?react";
import PersonCheckIcon from "../icons/person-check.svg?react";
import MessengerIcon from "../icons/messenger.svg?react";
import PersonRemoveIcon from "../icons/person-remove.svg?react";
import CameraIcon from "../icons/camera.svg?react";
import FormData from "form-data";
import axios from "axios";
import getUserHeaders from "../helpers/getUserHeaders";

const Profile = ({ userToDisplay, setNotification, setUserToDisplay, setCurrentUser }) => {
    const handleAddFriend = async (toUserId) => {
        const url = "/api/friend-requests";
        const headers = getUserHeaders();
        const userObject = {
            toUserId: toUserId,
        };

        try {
            const updatedUser = await axios.post(url, userObject, { headers });
            setUserToDisplay(updatedUser.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = async (toUserId) => {
        const url = `/api/friend-requests/${toUserId}/cancel`;
        const headers = getUserHeaders();
        const userObject = {};

        try {
            const updatedUser = await axios.post(url, userObject, { headers });
            setUserToDisplay(updatedUser.data);
        } catch (error) {
            console.log(error);
        }
    };

    const onInputClick = (event) => {
        event.target.value = "";
    };

    const handleImageUpload = async (event, field) => {
        const headers = getUserHeaders();
        const url1 = "/api/uploadImage";
        const url2 = `/api/users/${userToDisplay.id}`;

        // Display uploaded image to the DOM
        const files = event.target.files;
        const file = files[0];
        // let imageURL;
        // try {
        //     imageURL = URL.createObjectURL(file);
        //     // setUserToDisplay(imageURL);
        //     URL.revokeObjectURL(selectedImage);
        // } catch (error) {
        //     console.error("Error creating object URL:", error);
        // }

        // Confirm uploading of image to storage and database
        const text = "Are you sure you want to upload this photo?";

        if (confirm(text) === true) {
            const form = new FormData();
            try {
                form.append("image", file, "image.jpg");
                // Save the new profile photo to the file storage
                const cloudinaryUrl = await axios.post(url1, form);
                const object = { [field]: cloudinaryUrl.data }; //field should be profilePhoto or coverPhoto
                const userData = await axios.put(url2, object, { headers });
                setUserToDisplay(userData.data);
                setCurrentUser(userData.data);
                if (field === "coverPhoto") {
                    setNotification({ message: "Your cover photo has been updated", type: "success" });
                } else if (field === "profilePhoto") {
                    setNotification({ message: "Your profile photo has been updated", type: "success" });
                }
                setTimeout(() => {
                    setNotification(false);
                }, 5000);
            } catch (error) {
                console.log(error);
            }
        } else {
            return;
        }
    };

    if (!userToDisplay) {
        return <p>loading...</p>;
    }

    return (
        <>
            <div className="relative mb-[80px]">
                <img
                    src={userToDisplay.coverPhoto || defaultCoverPhoto}
                    alt="Cover Photo"
                    className="w-full h-36 object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                        e.target.src = defaultCoverPhoto;
                    }}
                />
                {userToDisplay.status === "self" && (
                    <label htmlFor="uploadCoverPhoto" className="absolute bottom-3 right-3 opacity-70 bg-slate-600 text-white text-xs px-2 py-1 rounded-md cursor-pointer hover:bg-slate-500 transition-colors" tabIndex="1">
                        <CameraIcon className="w-5 h-5 fill-white cursor-pointer" />
                        <form encType="multipart/form-data">
                            <input name="image" className="hidden" type="file" id="uploadCoverPhoto" accept="image/*" onChange={(event) => handleImageUpload(event, "coverPhoto")} onClick={onInputClick} />
                        </form>
                    </label>
                )}
                <div className="absolute w-32 h-32 left-1/2 transform -translate-x-1/2 top-[80px] ring-2 ring-black rounded-full">
                    <img
                        src={userToDisplay.profilePhoto || noProfilePhoto}
                        alt="Circle Image"
                        className="w-32 h-32 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                            e.target.src = noProfilePhoto;
                        }}
                    />{" "}
                    {/* height of box - half of circle = top margin */}
                    {userToDisplay.status === "self" && (
                        <label htmlFor="uploadProfilePhoto" className="absolute right-0 bottom-0 opacity-100 bg-slate-700 text-white text-xs px-2 py-1 rounded-md cursor-pointer hover:bg-slate-600 transition-colors" tabIndex="2">
                            <CameraIcon className="w-5 h-5 fill-white cursor-pointer" />
                            <form encType="multipart/form-data">
                                <input name="image" className="hidden" type="file" id="uploadProfilePhoto" accept="image/*" onChange={(event) => handleImageUpload(event, "profilePhoto")} onClick={onInputClick} />
                            </form>
                        </label>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-center mb-4">
                {/* {userToDisplay.displayName 
                ? <span className="text-3xl font-bold break-words">{userToDisplay.displayName}</span> 
                : <span className="text-3xl font-bold break-words">
                    {`${userToDisplay.firstName} ${userToDisplay.lastName}`}
                </span>} */}

                {userToDisplay.displayName ? <span className="text-3xl font-bold break-words">{userToDisplay.displayName}</span> : userToDisplay.firstName && userToDisplay.lastName ? <span className="text-3xl font-bold break-words">{`${userToDisplay.firstName} ${userToDisplay.lastName}`}</span> : userToDisplay.firstName ? <span className="text-3xl font-bold break-words">{userToDisplay.firstName}</span> : userToDisplay.lastName ? <span className="text-3xl font-bold break-words">{userToDisplay.lastName}</span> : null}

                {userToDisplay.bio && <span className={`text-xs italic m-1 text-cyan-400`}>"{userToDisplay.bio}"</span>}
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
                        <button className="flex items-center bg-slate-400 text-white text-xs px-3 py-1 rounded-md mr-2" onClick={() => handleCancel(userToDisplay.id)}>
                            <PersonRemoveIcon className="fill-white w-5 h-5 mr-1" />
                            Request sent
                        </button>
                        <button className="flex items-center bg-cyan-400 text-white text-xs px-3 py-1 rounded-md">
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
