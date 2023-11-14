import React from "react";
import noProfilePhoto from "../icons/noprofile.jpg";
import { Link } from "react-router-dom";

const Comments = ({ post }) => {
    return (
        <div>
            {post.comments.map((comment, index) => (
                <div key={index} className="flex items-start mb-2 text-xs">
                    <Link to={`/profile/${comment.postedBy.id}`}>
                        <img className="rounded-full w-8 h-8 mr-2 object-cover border border-white ring-1" src={comment.postedBy.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                    </Link>
                    <div className="flex flex-col max-w-[260px] outline-none bg-slate-300 rounded-2xl pl-4 pr-4 py-1" spellCheck="true">
                        <Link to={`/profile/${comment.postedBy.id}`}>
                            <span className="font-bold hover:underline">{comment.postedBy.firstName || comment.postedBy.displayName}</span>
                        </Link>
                        <span className="text-black w-full cursor-text break-words">{comment.text}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;
