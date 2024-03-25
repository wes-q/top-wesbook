import { useEffect, useState } from "react";
import PlusCircle from "../icons/pluscircle.svg?react";
import ModalNewPost from "./ModalNewPost";
import sortByDate from "../helpers/helper";
import axios from "axios";
import Post from "./Post";
import { useParams } from "react-router-dom";
import getUserHeaders from "../helpers/getUserHeaders";

const Posts = ({ userToDisplay, postsOf, currentUser, setNotification }) => {
    const [showNewPost, setShowNewPost] = useState(false);
    const [posts, setPosts] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        getAllPosts();
    }, [userToDisplay]);

    const getAllPosts = async () => {
        const headers = getUserHeaders();

        let url;
        if (postsOf === "friends") {
            url = "/api/posts-of-friends";
        } else if (postsOf === "user") {
            // url = `/api/posts/${id}`;
            url = `/api/users/${userId}/posts`;
        }

        try {
            // const data = await postsService.getAll({ headers }); // Get all posts

            const { data } = await axios.get(url, { headers }); // Get all posts of friends
            sortByDate(data);
            // console.log(data);
            setPosts(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleNewPost = () => {
        setShowNewPost(true);
    };

    // Updates the like state
    const handleLikeChange = (postId, newLikedValue) => {
        // Find the post in the array and update its isLikedByUser property
        let totalLikes;
        const updatedPosts = posts.map((post) => {
            if (post.id === postId) {
                if (newLikedValue === true) {
                    totalLikes = post.totalLikes - 1;
                } else {
                    totalLikes = post.totalLikes + 1;
                }

                return { ...post, isLikedByCurrentUser: !newLikedValue, totalLikes: totalLikes };
            }
            return post;
        });
        // Update the state with the new array
        setPosts(updatedPosts);
    };

    return (
        <>
            <div className="flex flex-col text-sm items-start sm:max-w-[573px] gap-4">
                {showNewPost && <ModalNewPost setShowNewPost={setShowNewPost} currentUser={userToDisplay} getAllPosts={getAllPosts} />}
                {/* {userToDisplay.status === "self" && ( */}
                {(userId === currentUser.id || postsOf === "friends") && (
                    <div className="flex items-center w-full h-16 bg-light-b dark:bg-dark-b rounded-md p-2 hover:cursor-pointer hover:bg-primaryDark hover:dark:bg-primaryDark shadow-md transition-colors" onClick={handleNewPost}>
                        <PlusCircle className="h-10 w-10 mr-2" />
                        <div className="flex flex-col">
                            <span className="font-bold">Create new post</span>
                            <span className="">Share a photo or write something. </span>
                        </div>
                    </div>
                )}
                {posts.length === 0 && (
                    <div className="w-full border mb-4 rounded-md bg-light-b dark:bg-dark-b p-2 shadow-md">
                        {postsOf === "friends" ? ( // asdasdsa
                            <div className="whitespace-pre-wrap">No posts from friends yet.{"\n"}Maybe it's time to add some friends!</div>
                        ) : (
                            <div className="whitespace-pre-wrap">This user has no posts yet</div>
                        )}
                    </div>
                )}
                {posts.map((post, index) => {
                    return <Post key={index} post={post} getAllPosts={getAllPosts} currentUser={currentUser} setNotification={setNotification} handleLikeChange={handleLikeChange} />;
                })}
            </div>
        </>
    );
};

export default Posts;
