import { useEffect, useState } from "react";
import PlusCircle from "../icons/pluscircle.svg?react";
import ModalNewPost from "./ModalNewPost";
import DotDotDot from "../icons/dotdotdot.svg?react";
import Like from "../icons/like.svg?react";
import Comment from "../icons/comment.svg?react";
import postsService from "../services/posts";
import sortByDate from "../helpers/helper";
import { format, parseISO } from "date-fns";

const Posts = ({ user }) => {
    const [showNewPost, setShowNewPost] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = async () => {
        const data = await postsService.getAll();

        // const sortByDate = (data) => data.sort(({ createdAt: a }, { createdAt: b }) => (a < b ? -1 : a > b ? 1 : 0));

        // // Convert createdAt strings to Date objects
        // data.forEach((post) => {
        //     post.createdAt = new Date(post.createdAt);
        // });

        // data.sort((a, b) => b.createdAt - a.createdAt);
        // data.sort((a, b) => a.content.localeCompare(b.content));

        console.log(sortByDate(data));
        setPosts(data);
    };

    const handleNewPost = () => {
        //Call Modal
        setShowNewPost(true);
    };

    const handleLike = async (postId) => {
        const loggedUserToken = window.localStorage.getItem("loggedUserToken");
        if (loggedUserToken) {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loggedUserToken}`,
            };

            const object = {};

            try {
                await postsService.update(postId, object, { headers });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            {showNewPost && <ModalNewPost setShowNewPost={setShowNewPost} user={user} getAllPosts={getAllPosts} />}

            <div className="flex flex-col p-6 text-black text-sm">
                <div className="flex items-center mx-auto w-80 h-16 border ring-1 mb-4 rounded-sm bg-slate-200 p-2 hover:cursor-pointer hover:bg-cyan-400 transition-colors" onClick={handleNewPost}>
                    <PlusCircle className="h-10 w-10 mr-2" />
                    <div className="flex flex-col">
                        <span className="font-bold">Create new post</span>
                        <span>Share a photo or write something.</span>
                    </div>
                </div>

                {posts.map((post, index) => {
                    const jsDate = parseISO(post.createdAt);
                    const formattedDate = format(jsDate, "MMM dd, yyyy");

                    return (
                        <div key={index} className="flex flex-col mx-auto w-80 border ring-1 mb-4 rounded-sm bg-slate-200 p-2">
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
                            <span>{post.content}</span>
                            <hr className="w-full border-t border-gray-300 mb-4" />

                            <div className="flex justify-around">
                                <div className="flex items-center justify-center cursor-pointer w-full hover:bg-slate-300 rounded-md py-1" onClick={() => handleLike(post.id)}>
                                    <Like className="w-4 mr-2"></Like>
                                    <span>Like</span>
                                </div>
                                <div className="flex items-center justify-center cursor-pointer w-full hover:bg-slate-300 rounded-md py-1">
                                    <Comment className="w-4 mr-2"></Comment>
                                    <span>Comment</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Posts;
