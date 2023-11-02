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

postsRouter.get("/api/posts", async (request, response, next) => {
    try {
        const posts = await Post.find({}).populate({ path: "author", select: "firstName displayName profilePhoto" });
        response.json(posts);
    } catch (error) {
        next(error);
    }
});

module.exports = postsRouter;
