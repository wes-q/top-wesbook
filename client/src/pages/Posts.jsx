import { useEffect, useState } from "react";
import noProfilePhoto from "../icons/noprofile.jpg";
import PlusCircle from "../icons/pluscircle.svg?react";
import ModalNewPost from "./ModalNewPost";
import DotDotDot from "../icons/dotdotdot.svg?react";
import Like from "../icons/like.svg?react";
import Comment from "../icons/comment.svg?react";
import LikeCount from "../icons/like-count.svg?react";
import postsService from "../services/posts";
import sortByDate from "../helpers/helper";
import { format, parseISO } from "date-fns";
import UserCommentBox from "./UserCommentBox";
import Comments from "./Comments";
import axios from "axios";

const Posts = ({ user }) => {
    const [showNewPost, setShowNewPost] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = async () => {
        const loggedUserToken = window.localStorage.getItem("loggedUserToken");
        let headers;
        if (loggedUserToken) {
            headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loggedUserToken}`,
            };
        }

        const url = "/api/posts-of-friends";
        const object = {};

        try {
            // const data = await postsService.getAll({ headers }); // Get all posts

            const { data } = await axios.get(url, { headers }); // Get all posts of friends
            console.log(sortByDate(data));
            setPosts(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleNewPost = () => {
        setShowNewPost(true);
    };

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

    const handleComment = () => {
        setIsCommentClicked(true);
        //Set focus to comment
    };

    return (
        <>
            {showNewPost && <ModalNewPost setShowNewPost={setShowNewPost} user={user} getAllPosts={getAllPosts} />}

            <div className="flex flex-col p-6 text-black text-sm">
                <div className="flex items-center mx-auto w-80 h-16 border ring-1 mb-4 rounded-md bg-slate-200 p-2 hover:cursor-pointer hover:bg-cyan-400 transition-colors" onClick={handleNewPost}>
                    <PlusCircle className="h-10 w-10 mr-2" />
                    <div className="flex flex-col">
                        <span className="font-bold">Create new post</span>
                        <span>Share a photo or write something.</span>
                    </div>
                </div>

                {posts.map((post, index) => {
                    const jsDate = parseISO(post.createdAt);
                    const formattedDate = format(jsDate, "MMM dd, yyyy");
                    const totalLikes = post.likes.length;
                    const totalComments = post.comments.length;

                    function pluralize(word, count) {
                        return count === 1 ? word : `${word}s`;
                    }

                    return (
                        <div key={index} className="flex flex-col mx-auto w-80 border ring-1 mb-4 rounded-md bg-slate-200 p-2">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex">
                                    <img className="rounded-full h-10 w-10 mr-2 object-cover border border-white ring-1" src={post.author.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                                    <div className="flex flex-col justify-center">
                                        <span className="font-bold">{post.author.firstName || post.author.displayName}</span>
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

                            {/* <div className="flex justify-between items-center bg-slate-300 rounded-2xl">
                                <textarea className="w-full bg-slate-300 outline-none resize-none rounded-2xl pl-4 pr-3 py-1 overflow-hidden" placeholder="Write a public comment..." cols="30" rows="2" spellCheck="false"></textarea>
                                <Send className="w-6 mr-2 fill-cyan-500"></Send>
                            </div> */}

                            {/* <div className="flex justify-between items-center bg-slate-300 rounded-2xl">
                                <textarea className="w-full bg-slate-300 outline-none resize-none rounded-2xl pl-4 pr-3 py-1 overflow-hidden" placeholder="Write a public comment..." cols="30" rows="2" spellCheck="false"></textarea>
                                <Send className="w-6 mr-2 fill-cyan-500"></Send>
                            </div> */}
                            {/* style="user-select: text; white-space: pre-wrap; word-break: break-word;" */}
                            {/* <div className="outline-none bg-slate-300 rounded-2xl pl-4 pr-3 py-1"> */}
                            {/* </div> */}
                            <Comments post={post}></Comments>
                            <UserCommentBox user={user} getAllPosts={getAllPosts} postId={post.id} />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Posts;
