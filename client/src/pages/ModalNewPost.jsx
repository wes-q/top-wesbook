import { useState, useRef, useEffect } from "react";
import X from "../icons/x.svg?react";
import PhotoIcon from "../icons/add-photo.svg?react";
import postsService from "../services/posts";
import noProfilePhoto from "../icons/noprofile.jpg";
import FormData from "form-data";
import axios from "axios";
import getUserHeaders from "../helpers/getUserHeaders";

const ModalNewPost = ({ setShowNewPost, currentUser, getAllPosts }) => {
    const [postText, setPostText] = useState(""); // State to track the text in the textarea
    const [postBackgroundColor, setPostBackgroundColor] = useState("bg-gray-500 text-white hover:cursor-not-allowed"); // State to manage the background color
    const textAreaRef = useRef(null);
    const [postImage, setPostImage] = useState(null);
    const [files, setFiles] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleClose = () => {
        setShowNewPost(false);
    };

    const handleTextChange = (event) => {
        const text = event.target.value.trim();
        setPostText(text); // Update the text in state
    };

    const handlePost = async () => {
        let postPhoto = "";
        // Step 1: Save image to cloud storage if there is image
        if (files) {
            const url = "/api/uploadImage";
            const form = new FormData();
            form.append("image", files[0], "image.jpg");
            try {
                const cloudinaryUrl = await axios.post(url, form);
                postPhoto = cloudinaryUrl.data;
            } catch (error) {
                console.log(error);
            }
        }

        // Step 2: Save photo and content to the post collection
        const object = {
            content: postText,
            postPhoto: postPhoto,
        };

        const headers = getUserHeaders();
        try {
            const newPost = await postsService.create(object, { headers });
            console.log(newPost);
            setShowNewPost(false); //Close the modal
            getAllPosts();
        } catch (error) {
            console.log(error);
        }
    };

    const autoGrow = (element) => {
        if (!element.current) {
            return;
        }
        element.current.style.height = element.current.scrollHeight + "px";
    };

    const onInputClick = (event) => {
        event.target.value = "";
    };

    const handleAddImage = async (event) => {
        // Display uploaded image to the DOM
        const files = event.target.files;
        const file = files[0];
        let imageURL;
        try {
            imageURL = URL.createObjectURL(file);
            setPostImage(imageURL);
            setFiles(files); // Save files to state
            URL.revokeObjectURL(postImage);
            // setPostBackgroundColor("bg-primary text-black ring-1");
        } catch (error) {
            console.error("Error creating object URL:", error);
        }
    };

    const handleRemoveImage = () => {
        setPostImage(null);
        setFiles(null);
    };

    useEffect(() => {
        // Check if there's text in the textarea or an image is selected
        if (postText.length > 0 || postImage) {
            setPostBackgroundColor("bg-primary text-black ring-1");
            setIsDisabled(false);
        } else {
            setPostBackgroundColor("bg-gray-500 text-white hover:cursor-not-allowed");
            setIsDisabled(true);
        }
    }, [postText, postImage]);

    return (
        <div className="relative z-10 text-black select-none">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
            <div className="fixed inset-0 z-10 flex flex-col items-center justify-center">
                <div className="flex flex-col p-4 text-center justify-center w-80 h-auto rounded-md bg-slate-200 shadow-xl">
                    <div className="flex items-center justify-between w-full mb-4">
                        <span className="font-bold">Create new post</span>
                        <X className="cursor-pointer" onClick={handleClose}></X>
                    </div>

                    <hr className="w-full border-t border-gray-300 mb-4" />

                    {currentUser && (
                        <div className="flex items-center mb-4">
                            <img className="rounded-full h-10 w-10 mr-2 object-cover border border-white" src={currentUser.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                            <span className="font-bold">{currentUser.firstName || currentUser.displayName}</span>
                        </div>
                    )}

                    <textarea ref={textAreaRef} className="w-full bg-slate-200 outline-none resize-none mb-4 overflow-hidden max-h-64" id="" cols="30" rows="3" placeholder="What's on your mind?" spellCheck="false" onChange={handleTextChange} onInput={autoGrow(textAreaRef)}></textarea>

                    {postImage && (
                        <div className="relative overflow-auto max-h-72">
                            <button className="absolute top-2 right-2 w-8 h-8 opacity-50 text-white text-sm rounded-full bg-gray-800 hover:bg-gray-700 p-1">
                                <X className="cursor-pointer fill-white" onClick={handleRemoveImage}></X>
                            </button>
                            <img className="object-cover max-w-full h-auto" src={postImage} alt="Post Image" />
                        </div>
                    )}

                    <hr className="w-full border-t border-gray-300 mb-4" />

                    <div className="flex items-center justify-between w-full">
                        <label htmlFor="uploadPostImage" className="flex items-center group opacity-100 text-xs px-2 py-1 rounded-md cursor-pointer transition-colors" tabIndex="2">
                            <PhotoIcon className="group-hover:fill-gray-500 mr-2"></PhotoIcon>
                            <span className="group-hover:text-gray-500">Add image</span>
                            <form encType="multipart/form-data">
                                <input name="image" className="hidden" type="file" id="uploadPostImage" accept="image/*" onChange={handleAddImage} onClick={onInputClick} />
                            </form>
                        </label>

                        <button className={`px-4 py-1 w-1/2 ${postBackgroundColor} bg-gray-500 rounded-sm`} onClick={handlePost} disabled={isDisabled}>
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalNewPost;
