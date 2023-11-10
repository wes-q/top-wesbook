import { useEffect, useState } from "react";
import PlusCircle from "../icons/pluscircle.svg?react";
import ModalNewPost from "./ModalNewPost";
import sortByDate from "../helpers/helper";
import axios from "axios";
import Post from "./Post";

const Posts = ({ currentUser }) => {
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

    return (
        <>
            {showNewPost && <ModalNewPost setShowNewPost={setShowNewPost} currentUser={user} getAllPosts={getAllPosts} />}

            <div className="flex flex-col p-6 text-black text-sm">
                <div className="flex items-center mx-auto w-80 h-16 border ring-1 mb-4 rounded-md bg-slate-200 p-2 hover:cursor-pointer hover:bg-cyan-400 transition-colors" onClick={handleNewPost}>
                    <PlusCircle className="h-10 w-10 mr-2" />
                    <div className="flex flex-col">
                        <span className="font-bold">Create new post</span>
                        <span>Share a photo or write something.</span>
                    </div>
                </div>

                {posts.map((post, index) => {
                    return <Post key={index} post={post} currentUser={currentUser} getAllPosts={getAllPosts} />;
                })}
            </div>
        </>
    );
};

export default Posts;
