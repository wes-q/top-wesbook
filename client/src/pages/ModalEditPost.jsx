import { useState, useRef, useEffect } from "react";
import X from "../icons/x-close-google.svg?react";
import PhotoIcon from "../icons/add-photo.svg?react";
import noProfilePhoto from "../icons/noprofile.jpg";
import FormData from "form-data";
import axios from "axios";
import getUserHeaders from "../helpers/getUserHeaders";

const ModalEditPost = ({ post, setShowEditPost, currentUser, getAllPosts }) => {
    const [postContent, setPostContent] = useState(post.content);
    const [postPhoto, setPostPhoto] = useState(post.postPhoto);
    const [postBackgroundColor, setPostBackgroundColor] = useState("bg-neutral hover:cursor-not-allowed"); // State to manage the background color
    const textAreaRef = useRef(null);
    const [files, setFiles] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleClose = () => {
        setShowEditPost(false);
    };

    const handleTextChange = (event) => {
        const content = event.target.value;
        setPostContent(content); // Update the text in state
    };

    const handlePost = async () => {
        let object;
        // Step 1: Save image to cloud storage if there is new image
        if (files) {
            const url = "/api/uploadImage";
            const form = new FormData();
            form.append("image", files[0], "image.jpg");
            try {
                const cloudinaryUrl = await axios.post(url, form);
                object = {
                    content: postContent,
                    postPhoto: cloudinaryUrl.data,
                };
            } catch (error) {
                console.log(error);
            }
        } else {
            object = {
                content: postContent,
                postPhoto: postPhoto,
            };
        }

        const url = `/api/posts/${post.id}`;
        // Step 2: Save photo and content to the post collection

        const headers = getUserHeaders();
        try {
            const editedPost = await axios.patch(url, object, { headers });
            console.log(editedPost);
            setShowEditPost(false); //Close the modal
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
            setPostPhoto(imageURL);
            setFiles(files); // Save files to state
            URL.revokeObjectURL(postPhoto);
            // setPostBackgroundColor("bg-primary text-black ring-1");
        } catch (error) {
            console.error("Error creating object URL:", error);
        }
    };

    const handleRemoveImage = () => {
        setPostPhoto(null);
        setFiles(null);
    };

    useEffect(() => {
        // Check if there's text in the textarea or an image is selected
        if (postContent.length > 0 || postPhoto) {
            setPostBackgroundColor("bg-primary dark:bg-primaryDark");
            setIsDisabled(false);
        } else {
            setPostBackgroundColor("bg-neutral text-white hover:cursor-not-allowed");
            setIsDisabled(true);
        }
    }, [postContent, postPhoto]);

    return (
        <div className="relative z-10 select-none">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
            <div className="fixed inset-0 z-10 flex flex-col items-center justify-center">
                <div className="flex flex-col p-4 text-center justify-center w-full sm:w-[450px] h-auto rounded-md bg-light-b dark:bg-dark-b shadow-xl">
                    <div className="flex items-center justify-between w-full mb-4">
                        <span className="font-bold">Edit post</span>
                        <X className="cursor-pointer fill-current" onClick={handleClose}></X>
                    </div>

                    <hr className="w-full border-t border-light-c dark:border-dark-a mb-4" />

                    {currentUser && (
                        <div className="flex items-center mb-4">
                            <img className="rounded-full h-10 w-10 mr-2 object-cover border border-white" src={currentUser.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                            <span className="font-bold">{currentUser.firstName || currentUser.displayName}</span>
                        </div>
                    )}

                    <textarea ref={textAreaRef} value={postContent} className="w-full bg-transparent outline-none resize-none mb-4 overflow-hidden max-h-64" id="" cols="30" rows="3" placeholder="What's on your mind?" spellCheck="false" autoFocus onChange={handleTextChange} onInput={autoGrow(textAreaRef)} />

                    {postPhoto && (
                        <div className="relative overflow-auto max-h-72">
                            {/* <button className="absolute top-2 right-2 w-8 h-8 opacity-50 text-sm rounded-full p-1"> */}
                            <button className="absolute top-2 right-2 w-8 h-8 opacity-50 text-sm rounded-full bg-black hover:opacity-100 p-1">
                                <X className="cursor-pointer fill-current" onClick={handleRemoveImage}></X>
                            </button>
                            <img className="object-cover max-w-full h-auto" src={postPhoto} alt="Post Image" />
                        </div>
                    )}

                    <hr className="w-full border-t border-gray-300 mb-4" />

                    <div className="flex items-center justify-between w-full">
                        <label htmlFor="uploadPostPhoto" className="flex items-center group opacity-100 text-xs px-2 py-1 rounded-md cursor-pointer transition-colors" tabIndex="2">
                            <PhotoIcon className="group-hover:opacity-70 mr-2 fill-current"></PhotoIcon>
                            <span className="group-hover:opacity-70">Add image</span>
                            <form encType="multipart/form-data">
                                <input name="image" className="hidden" type="file" id="uploadPostPhoto" accept="image/*" onChange={handleAddImage} onClick={onInputClick} />
                            </form>
                        </label>

                        <button className={`px-4 py-2 w-1/2 ${postBackgroundColor} rounded-md`} onClick={handlePost} disabled={isDisabled}>
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalEditPost;
