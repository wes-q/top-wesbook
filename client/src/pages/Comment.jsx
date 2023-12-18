import { useEffect, useRef } from "react";
import noProfilePhoto from "../icons/noprofile.jpg";
import { Link } from "react-router-dom";
import DotDotDotIcon from "../icons/dotdotdot.svg?react";
import EditPenIcon from "../icons/edit-pen-google.svg?react";
import DeleteIcon from "../icons/delete.svg?react";
import axios from "axios";
import getUserHeaders from "../helpers/getUserHeaders";

const Comment = ({ comment, postId, setNotification, getAllPosts, currentUser }) => {
    const detailsRef = useRef(null);

    // Collapses the popup when user clicks outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the details element
            if (detailsRef.current && !detailsRef.current.contains(event.target)) {
                // Close the details element
                detailsRef.current.open = false;
            }
        };

        // Add click event listener to the entire document
        document.addEventListener("click", handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleDeleteComment = async (postId, commentId) => {
        if (confirm("Are you sure you want to delete this post?")) {
            const url = `/api/posts/${postId}/comments/${commentId}`;
            const headers = getUserHeaders();

            try {
                const message = await axios.delete(url, { headers });
                console.log(message.data);
                getAllPosts();
                // setNotification({ message: message.data.message, type: "info" });
                setNotification({ message: "Comment deleted", type: "info" });
                setTimeout(() => {
                    setNotification(false);
                }, 2000);
            } catch (error) {
                console.log(error);
                setNotification({ message: error.response.data.message, type: "error" });
                setTimeout(() => {
                    setNotification(false);
                }, 5000);
            } finally {
                detailsRef.current.open = false; //Close the details element
            }
        }
    };

    return (
        <div className="flex items-start mb-2 text-xs">
            <Link to={`/profile/${comment.postedBy.id}`}>
                <img
                    className="rounded-full w-8 h-8 mr-2 object-cover border border-white ring-1"
                    src={comment.postedBy.profilePhoto || noProfilePhoto}
                    alt="profile photo"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                        e.target.src = noProfilePhoto;
                    }}
                />
            </Link>
            <div className="flex items-center group">
                <div className="flex flex-col max-w-[260px] outline-none bg-light-c dark:bg-dark-a rounded-2xl pl-4 pr-4 py-1 mr-1" spellCheck="true">
                    <Link to={`/profile/${comment.postedBy.id}`}>
                        {(() => {
                            if (comment.postedBy.displayName) {
                                return <span className="font-bold hover:underline">{comment.postedBy.displayName}</span>;
                            } else if (comment.postedBy.firstName && comment.postedBy.lastName) {
                                return <span className="font-bold hover:underline">{`${comment.postedBy.firstName} ${comment.postedBy.lastName}`}</span>;
                            } else if (comment.postedBy.firstName) {
                                return <span className="font-bold hover:underline">{comment.postedBy.firstName}</span>;
                            } else if (comment.postedBy.lastName) {
                                return <span className="font-bold hover:underline">{comment.postedBy.lastName}</span>;
                            } else {
                                return null;
                            }
                        })()}
                    </Link>
                    <span className="w-full cursor-text break-words whitespace-pre-wrap">{comment.text}</span>
                </div>
                <details className="relative" ref={detailsRef}>
                    <summary className="list-none" aria-haspopup="menu" role="button">
                        <div className="rounded-full group-hover:visible invisible hover:bg-light-c hover:dark:bg-dark-a p-2">
                            <DotDotDotIcon className="w-3 h-3 fill-current" />
                        </div>
                    </summary>
                    <div className="absolute flex flex-col top-5 -left-16 z-10 bg-light-a dark:bg-dark-a shadow-md border border-light-c dark:border-dark-c rounded-md text-xs select-none">
                        {/* {comment.postedBy.id === currentUser.id && (
                            <button className="flex items-center hover:bg-slate-300 w-full transition-colors p-1" onClick={() => handleEditComment(postId, comment.id)}>
                                <EditPenIcon className="w-6 h-6 mr-1" />
                                <span className="w-full whitespace-nowrap text-left">Edit</span>
                            </button>
                        )} */}
                        <button className="flex items-center hover:bg-slate-300 w-full transition-colors p-1" onClick={() => handleDeleteComment(postId, comment.id)}>
                            <DeleteIcon className="w-6 h-6 mr-1 fill-red-600" />
                            <span className="w-full whitespace-nowrap text-left">Delete</span>
                        </button>
                    </div>
                </details>
            </div>
        </div>
    );
};

export default Comment;
