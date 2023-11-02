const postsRouter = require("express").Router();
const Post = require("../models/post");
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
    console.log(request.user.id);

    try {
        const posts = await Post.find({}).populate({ path: "author", select: "firstName displayName profilePhoto" });

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

postsRouter.get("/api/check/:postId", middleware.userExtractor, async (req, res, next) => {
    const postId = req.params.postId; // Extract the post ID from the route parameter
    try {
        const post = await Post.findById(postId).exec();

        const isLikedByCurrentUser = post.likes.some((like) => like.user.toString() === req.user.id);

        res.json({ post, isLikedByCurrentUser });
    } catch (error) {
        // Handle the error
        next(error);
    }
});

postsRouter.put("/api/posts/:id", middleware.userExtractor, async (request, response, next) => {
    try {
        const postToUpdate = await Post.findById(request.params.id);

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

module.exports = postsRouter;
