import { useState, useRef, useEffect } from "react";
import Send from "../icons/send.svg?react";
import Camera from "../icons/camera.svg?react";
import Emoji from "../icons/emoji.svg?react";
import noProfilePhoto from "../icons/noprofile.jpg";

const UserCommentBox = ({ user }) => {
    const [isCommentClicked, setIsCommentClicked] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [postIconStyle, setPostIconStyle] = useState("");
    const contentEditableRef = useRef(null);
    // const [placeholder, setPlaceholder] = useState()

    const handleCommentClick = () => {
        setIsCommentClicked(true);
    };

    const handleTextChange = (event) => {
        const text = event.target.innerText;
        setCommentText(text);

        if (text.length > 0) {
            setPlaceholder();
            setPostIconStyle("fill-cyan-500 hover:cursor-pointer");
        } else {
            setPostIconStyle("hover:cursor-not-allowed");
        }
    };

    //Use useEffect to focus on the contentEditable div when it becomes visible
    useEffect(() => {
        if (isCommentClicked) {
            contentEditableRef.current.focus();
        }
    }, [isCommentClicked]);

    return (
        <div className="flex">
            <img className="rounded-full w-8 h-8 mr-2 object-cover border border-white ring-1" src={user.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
            {isCommentClicked ? (
                <div className="flex flex-col grow max-w-[260px] outline-none bg-slate-300 rounded-2xl pl-4 pr-3 py-1" spellCheck="false">
                    <div ref={contentEditableRef} className="outline-none w-full max-w-full" contentEditable="true" onInput={handleTextChange}></div>
                    <div className="flex justify-between items-center">
                        <div className="flex">
                            <Emoji className="w-5 mr-1" />
                            <Camera className="w-5 mr-1" />
                        </div>
                        <div>
                            <Send className={`w-6 mr-2 ${postIconStyle}`}></Send>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-center grow max-w-[260px] outline-none bg-slate-300 rounded-2xl pl-4 pr-3 py-1" spellCheck="true">
                    <div className="flex justify-between w-full items-center">
                        <span className="text-gray-500 w-full cursor-text" onClick={handleCommentClick}>
                            Write a public comment...
                        </span>
                        <Send className="w-6 mr-2 cursor-not-allowed"></Send>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserCommentBox;
