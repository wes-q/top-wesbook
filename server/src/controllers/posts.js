const postsRouter = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");
const middleware = require("../utils/middleware");

postsRouter.post("/api/posts", middleware.userExtractor, async (request, response, next) => {
    try {
        const body = request.body;
        const currentDate = new Date().toISOString(); // Generates the current date and time in ISO 8601 format

        const post = new Post({
            author: request.user.id,
            content: body.content,
            createdAt: currentDate,
        });

        const savedPost = await post.save();
        response.json(savedPost);
    } catch (error) {
        next(error);
    }
});

postsRouter.get("/api/posts", middleware.userExtractor, async (request, response, next) => {
    try {
        const posts = await Post.find({}).populate({ path: "author", select: "firstName displayName profilePhoto" }).populate({ path: "comments.postedBy", select: "firstName displayName profilePhoto" });
        const postsWithIsLiked = posts.map((post) => {
            const isLikedByCurrentUser = post.likes.some((like) => like.user.toString() === request.user.id);
            return {
                ...post.toJSON(),
                isLikedByCurrentUser,
            };
        });
        response.json(postsWithIsLiked);
    } catch (error) {
        next(error);
    }
});

postsRouter.get("/api/posts-of-friends", middleware.userExtractor, async (request, response, next) => {
    const user = await User.findById(request.user.id).select("friends.friendId");
    const friendIds = user.friends.map((friend) => friend.friendId);
    const postsOfFriends = await Post.find().where("author").in(friendIds).populate({ path: "author", select: "firstName displayName profilePhoto" }).populate({ path: "comments.postedBy", select: "firstName displayName profilePhoto" });

    const postsWithIsLiked = postsOfFriends.map((post) => {
        const isLikedByCurrentUser = post.likes.some((like) => like.user.toString() === request.user.id);
        return {
            ...post.toJSON(),
            isLikedByCurrentUser,
        };
    });

    response.json(postsWithIsLiked);
});

postsRouter.patch("/api/posts/:postId/likes", middleware.userExtractor, async (request, response, next) => {
    try {
        const postToUpdate = await Post.findById(request.params.postId);

        if (postToUpdate.likes.some((post) => post.user.toString() === request.user.id)) {
            return response.status(400).json({ message: "Post liked already" });
        }

        postToUpdate.likes.push({ user: request.user.id, likeType: "like" });
        const updatedPost = await postToUpdate.save();
        response.json(updatedPost);
    } catch (error) {
        next(error);
    }
});

postsRouter.patch("/api/posts/:postId/comments", middleware.userExtractor, async (request, response, next) => {
    try {
        const postToUpdate = await Post.findById(request.params.postId);

        postToUpdate.comments.push({ text: request.body.text, postedBy: request.user.id });
        const updatedPost = await postToUpdate.save();
        response.json(updatedPost);
    } catch (error) {
        next(error);
    }
});

module.exports = postsRouter;
