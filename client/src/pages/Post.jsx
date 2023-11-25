import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import noProfilePhoto from "../icons/noprofile.jpg";
import DotDotDot from "../icons/dotdotdot.svg?react";
import Like from "../icons/like.svg?react";
import Comment from "../icons/comment.svg?react";
import LikeCount from "../icons/like-count.svg?react";
import EditPenIcon from "../icons/edit-pen-google.svg?react";
import DeleteIcon from "../icons/delete.svg?react";
import { format, parseISO } from "date-fns";
import UserCommentBox from "./UserCommentBox";
import Comments from "./Comments";
import axios from "axios";
import postService from "../services/posts";
import getUserHeaders from "../helpers/getUserHeaders";
import ModalEditPost from "./ModalEditPost";

const Post = ({ post, getAllPosts, currentUser, setNotification, handleLikeChange }) => {
    const [totalLikes, setTotalLikes] = useState(post.likes.length);
    const [isCommentClicked, setIsCommentClicked] = useState(false);
    const jsDate = parseISO(post.createdAt);
    const formattedDate = format(jsDate, "MMM dd, yyyy");
    const totalComments = post.comments.length;
    const detailsRef = useRef(null);
    const contentEditableRef = useRef(null);
    const [showEditPost, setShowEditPost] = useState(false);

    const handleComment = () => {
        setIsCommentClicked(true);
        contentEditableRef.current && contentEditableRef.current.focus();
    };

    function pluralize(word, count) {
        return count === 1 ? word : `${word}s`;
    }

    const handleLike = async (postId) => {
        const headers = getUserHeaders();
        const url = `/api/posts/${postId}/likes`;
        const object = {};

        try {
            await axios.patch(url, object, { headers });
            // getAllPosts(); // instead of refreshing all the posts, only update the state
            handleLikeChange(postId, post.isLikedByCurrentUser);
            if (post.isLikedByCurrentUser === true) {
                setTotalLikes(totalLikes - 1);
            } else {
                setTotalLikes(totalLikes + 1);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeletePost = async (postId) => {
        const headers = getUserHeaders();

        if (confirm("Are you sure you want to delete this post?")) {
            try {
                await postService.remove(postId, { headers });
                getAllPosts();
                setNotification({ message: "Deleted post", type: "success" });
                setTimeout(() => {
                    setNotification(false);
                }, 5000);
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

    const handleEditPost = async (postId) => {
        setShowEditPost(true);
        detailsRef.current.open = false; //Close the details element
    };

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

    return (
        <>
            {showEditPost && <ModalEditPost post={post} setShowEditPost={setShowEditPost} currentUser={currentUser} getAllPosts={getAllPosts} />}

            <div className="flex flex-col w-full border ring-1 mb-4 rounded-md bg-slate-200 p-2">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex">
                        <Link to={`/profile/${post.author.id}`}>
                            <img
                                className="rounded-full h-10 w-10 mr-2 object-cover border border-white ring-1 cursor-pointer"
                                src={post.author.profilePhoto || noProfilePhoto}
                                alt="profile photo"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    e.target.src = noProfilePhoto;
                                }}
                            />
                        </Link>
                        <div className="flex flex-col justify-center">
                            <Link to={`/profile/${post.author.id}`}>
                                <span className="font-bold hover:underline">{post.author.firstName || post.author.displayName}</span>
                            </Link>
                            <span className="text-xs">{formattedDate}</span>
                        </div>
                    </div>
                    <div>
                        <details ref={detailsRef} className="relative">
                            <summary className="list-none" aria-haspopup="menu" role="button">
                                <DotDotDot className="w-4" />
                            </summary>
                            {/* <div className="absolute flex flex-col -bottom-16 -left-[100px] z-10 bg-slate-200 shadow-md border border-gray-300 rounded-md text-xs"> */}
                            <div className="absolute flex flex-col top-3 -left-[100px] z-10 bg-slate-200 shadow-md border border-gray-300 rounded-md text-xs">
                                {post.author.id === currentUser.id && (
                                    <button className="flex items-center hover:bg-slate-300 w-full transition-colors p-1" onClick={() => handleEditPost(post.id)}>
                                        <EditPenIcon className="w-6 h-6 mr-1" />
                                        <span className="w-full whitespace-nowrap text-left">Edit post</span>
                                    </button>
                                )}
                                <button className="flex items-center hover:bg-slate-300 w-full transition-colors p-1" onClick={() => handleDeletePost(post.id)}>
                                    <DeleteIcon className="w-6 h-6 mr-1 fill-red-600" />
                                    <span className="w-full whitespace-nowrap text-left">Delete post</span>
                                </button>
                            </div>
                        </details>
                    </div>
                </div>

                <hr className="w-full border-t border-gray-300 mb-4" />
                <span className="mb-4 break-words whitespace-pre-wrap">{post.content}</span>
                {post.postPhoto && (
                    <div className="overflow-auto max-h-[460px] mb-2">
                        <img className="object-cover max-w-full h-auto" src={post.postPhoto} alt="Post Photo" />
                    </div>
                )}

                <div className="flex justify-between text-xs mb-2">
                    {totalLikes > 0 && (
                        <div className="flex">
                            <LikeCount className="w-4 mr-1 fill-cyan-500"></LikeCount>
                            {totalLikes} {pluralize("like", totalLikes)}
                        </div>
                    )}
                    {totalComments > 0 && (
                        <div>
                            {totalComments} {pluralize("comment", totalComments)}
                        </div>
                    )}
                </div>

                <hr className="w-full border-t border-gray-300 mb-2" />

                <div className="flex justify-around mb-2">
                    <div className="flex items-center justify-center cursor-pointer w-full hover:bg-slate-300 rounded-md py-1" onClick={() => handleLike(post.id)}>
                        {post.isLikedByCurrentUser ? (
                            <>
                                <Like className="w-4 mr-2 fill-cyan-500"></Like>
                                <span className="text-cyan-500">Like</span>
                            </>
                        ) : (
                            <>
                                <Like className="w-4 mr-2"></Like>
                                <span>Like</span>
                            </>
                        )}
                    </div>
                    <div className="flex items-center justify-center cursor-pointer w-full hover:bg-slate-300 rounded-md py-1" onClick={handleComment}>
                        <Comment className="w-4 mr-2"></Comment>
                        <span>Comment</span>
                    </div>
                </div>

                <hr className="w-full border-t border-gray-300 mb-4" />

                <Comments post={post} setNotification={setNotification} getAllPosts={getAllPosts} currentUser={currentUser} />
                <UserCommentBox currentUser={currentUser} getAllPosts={getAllPosts} postId={post.id} setIsCommentClicked={setIsCommentClicked} isCommentClicked={isCommentClicked} contentEditableRef={contentEditableRef} />
            </div>
        </>
    );
};

export default Post;
