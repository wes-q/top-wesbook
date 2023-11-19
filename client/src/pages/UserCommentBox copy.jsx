import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import Send from "../icons/send.svg?react";
import Camera from "../icons/camera.svg?react";
import Emoji from "../icons/emoji.svg?react";
import noProfilePhoto from "../icons/noprofile.jpg";
import axios from "axios";
import getUserHeaders from "../helpers/getUserHeaders";

const UserCommentBox = ({ currentUser, getAllPosts, postId, isCommentClicked, setIsCommentClicked, contentEditableRef }) => {
    const [commentText, setCommentText] = useState("");
    const [postIconStyle, setPostIconStyle] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    // const [placeholder, setPlaceholder] = useState()

    // const handleCommentClick = () => {
    //     setIsCommentClicked(true);
    //     alert();
    //     contentEditableRef.current.focus();
    // };

    const handleTextChange = (event) => {
        const text = contentEditableRef.current.innerText.trim();
        setCommentText(text);
    };

    //Use useEffect to focus on the contentEditable div when it becomes visible
    // useEffect(() => {
    //     if (isCommentClicked) {
    //         contentEditableRef.current.focus();
    //     }
    // }, [isCommentClicked]);

    const handleSubmitComment = async (postId) => {
        if (isDisabled) {
            return;
        }

        const url = `/api/posts/${postId}/comments`;
        const object = { text: commentText };
        const headers = getUserHeaders();

        try {
            await axios.patch(url, object, { headers });
            setCommentText("");
            setIsDisabled(true);
            contentEditableRef.current.textContent = "";
            getAllPosts();
        } catch (error) {
            console.log(error);
        }
    };

    // const handleKeyPress = (event) => {
    //     if (event.key === "Enter" && !event.shiftKey) {
    //         handleSubmitComment(postId);
    //     }
    // };

    useEffect(() => {
        const isTextareaEmpty = (value) => {
            // Trim the value and check if it's an empty string
            return value.trim() === "";
        };

        const x = isTextareaEmpty(commentText);

        if (!x) {
            setPostIconStyle("fill-cyan-500 hover:cursor-pointer");
            setIsDisabled(false);
        } else {
            setPostIconStyle("hover:cursor-not-allowed");
            setIsDisabled(true);
        }
    }, [commentText]);

    return (
        <div className="flex text-xs">
            {currentUser && (
                <img
                    className="rounded-full w-8 h-8 mr-2 object-cover border border-white ring-1"
                    src={currentUser.profilePhoto || noProfilePhoto}
                    alt="profile photo"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                        e.target.src = noProfilePhoto;
                    }}
                />
            )}
            {isCommentClicked ? (
                <div className="flex flex-col grow max-w-[300px] outline-none bg-slate-300 rounded-2xl pl-4 pr-3 py-1" spellCheck="false">
                    <div ref={contentEditableRef} className="outline-none w-full max-w-full py-1" contentEditable="true" onInput={handleTextChange}></div>
                    <div className="flex justify-between items-center">
                        <div className="flex">
                            <Emoji className="w-5 mr-1" />
                            <Camera className="w-5 mr-1" />
                        </div>
                        <div>
                            <Send className={`w-6 mr-2 ${postIconStyle}`} onClick={() => handleSubmitComment(postId)}></Send>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center grow max-w-[300px] outline-none bg-slate-300 rounded-2xl pl-4 pr-3 py-1" spellCheck="true">
                    <div className="flex justify-between w-full items-center">
                        <span className="text-gray-500 w-full cursor-text">
                            {/* <span className="text-gray-500 w-full cursor-text" onClick={handleCommentClick}> */}
                            Write a comment...
                        </span>
                        <Send className="w-6 mr-2 cursor-not-allowed"></Send>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserCommentBox;
