import React from "react";
import noProfilePhoto from "../icons/noprofile.jpg";

const Comments = ({ post }) => {
    return (
        <div>
            {post.comments.map((comment, index) => (
                <div key={index} className="flex items-center mb-2 text-xs">
                    <img className="rounded-full w-8 h-8 mr-2 object-cover border border-white ring-1" src={comment.postedBy.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                    <div className="flex flex-col max-w-[260px] outline-none bg-slate-300 rounded-2xl pl-4 pr-4 py-1" spellCheck="true">
                        <span className="font-bold">{comment.postedBy.firstName || comment.postedBy.displayName}</span>
                        <span className="text-black w-full cursor-text break-words">{comment.text}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;
