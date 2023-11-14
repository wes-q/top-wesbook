import { useState } from "react";
import noProfilePhoto from "../icons/noprofile.jpg";
import DotDotDot from "../icons/dotdotdot.svg?react";
import Like from "../icons/like.svg?react";
import Comment from "../icons/comment.svg?react";
import LikeCount from "../icons/like-count.svg?react";
import { format, parseISO } from "date-fns";
import UserCommentBox from "./UserCommentBox";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import axios from "axios";

const Post = ({ post, currentUser, getAllPosts }) => {
    const [isCommentClicked, setIsCommentClicked] = useState(false);
    const jsDate = parseISO(post.createdAt);
    const formattedDate = format(jsDate, "MMM dd, yyyy");
    const totalLikes = post.likes.length;
    const totalComments = post.comments.length;

    const handleComment = () => {
        setIsCommentClicked(true);
    };

    function pluralize(word, count) {
        return count === 1 ? word : `${word}s`;
    }

    const handleLike = async (postId) => {
        const loggedUserToken = window.localStorage.getItem("loggedUserToken");
        if (loggedUserToken) {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loggedUserToken}`,
            };

            const url = `/api/posts/${postId}/likes`;
            const object = {};

            try {
                await axios.patch(url, object, { headers });
                getAllPosts();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="flex flex-col w-full border ring-1 mb-4 rounded-md bg-slate-200 p-2">
            <div className="flex items-center justify-between mb-2">
                <div className="flex">
                    <Link to={`/profile/${post.author.id}`}>
                        <img className="rounded-full h-10 w-10 mr-2 object-cover border border-white ring-1 cursor-pointer" src={post.author.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                    </Link>
                    <div className="flex flex-col justify-center">
                        <Link to={`/profile/${post.author.id}`}>
                            <span className="font-bold hover:underline">{post.author.firstName || post.author.displayName}</span>
                        </Link>
                        <span className="text-xs">{formattedDate}</span>
                    </div>
                </div>
                <div>
                    <DotDotDot className="w-4"></DotDotDot>
                </div>
            </div>

            <hr className="w-full border-t border-gray-300 mb-4" />
            <span className="mb-4 break-words">{post.content}</span>

            <div className="flex justify-between text-xs mb-1">
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

            <Comments post={post}></Comments>
            <UserCommentBox currentUser={currentUser} getAllPosts={getAllPosts} postId={post.id} setIsCommentClicked={setIsCommentClicked} isCommentClicked={isCommentClicked} />
        </div>
    );
};

export default Post;
