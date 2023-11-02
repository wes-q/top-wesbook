import { useState } from "react";
import X from "../icons/x.svg?react";
import PhotoIcon from "../icons/add-photo.svg?react";
import axios from "axios";
import postsService from "../services/posts";

const ModalNewPost = ({ setShowNewPost, user }) => {
    const [postText, setPostText] = useState(""); // State to track the text in the textarea
    const [postBackgroundColor, setPostBackgroundColor] = useState("bg-gray-500 text-white hover:cursor-not-allowed"); // State to manage the background color

    const handleClose = () => {
        setShowNewPost(false);
    };

    const handleTextChange = (event) => {
        const text = event.target.value.trim();
        setPostText(text); // Update the text in state

        if (text.length > 0) {
            setPostBackgroundColor("bg-primary text-black ring-1"); // Change to your desired background color
        } else {
            setPostBackgroundColor("bg-gray-500 text-white hover:cursor-not-allowed"); // Restore the default background color
        }
    };

    const handlePost = async () => {
        const object = {
            content: postText,
        };

        const loggedUserToken = window.localStorage.getItem("loggedUserToken");
        if (loggedUserToken) {
            const headerConfig = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${loggedUserToken}`,
                },
            };
            const newPost = await postsService.create(object, headerConfig);
            console.log(newPost);
        }
    };

    return (
        <div className="relative z-10 text-black select-none">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
            <div className="fixed inset-0 z-10 flex flex-col items-center justify-center">
                <div className="flex flex-col p-4 text-center justify-center w-80 h-auto overflow-hidden rounded-sm bg-slate-200 shadow-xl">
                    <div className="flex items-center justify-between w-full mb-4">
                        <span className="font-bold">Create new post</span>
                        <X className="cursor-pointer" onClick={handleClose}></X>
                    </div>

                    <hr className="w-full border-t border-gray-300 mb-4" />

                    <div className="flex items-center mb-4">
                        <img className="rounded-full h-10 w-10 mr-2 object-cover border border-white" src={user.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                        <span className="font-bold">{user.firstName || user.displayName}</span>
                    </div>

                    <textarea className="w-full bg-slate-200 outline-none resize-none mb-4" id="" cols="30" rows="3" placeholder="What's on your mind?" spellCheck="false" onChange={handleTextChange}></textarea>
                    <hr className="w-full border-t border-gray-300 mb-4" />

                    <div className="flex items-center justify-between w-full">
                        <div className="flex group items-center cursor-pointer">
                            <PhotoIcon className="group-hover:fill-gray-500 mr-2"></PhotoIcon>
                            <span className="group-hover:text-gray-500">Add image</span>
                        </div>
                        <button className={`px-4 py-1 w-1/2 ${postBackgroundColor} bg-gray-500 rounded-sm`} onClick={handlePost}>
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalNewPost;
