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
            postPhoto: body.postPhoto,
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
        // const posts = await Post.find({}).populate({ path: "author" });
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

    // Include the user's own ID in the friendIds
    friendIds.push(request.user.id);

    const postsOfFriends = await Post.find().where("author").in(friendIds).populate({ path: "author", select: "firstName displayName profilePhoto" }).populate({ path: "comments.postedBy", select: "firstName displayName profilePhoto" });
    // const postsOfFriends = await Post.find().where("author").in(friendIds).populate({ path: "author", select: "firstName displayName profilePhoto" });

    const postsWithIsLiked = postsOfFriends.map((post) => {
        const isLikedByCurrentUser = post.likes.some((like) => like.user.toString() === request.user.id);
        return {
            ...post.toJSON(),
            isLikedByCurrentUser,
        };
    });

    response.json(postsWithIsLiked);
});

postsRouter.get("/api/posts-of-self", middleware.userExtractor, async (request, response, next) => {
    const postsOfSelf = await Post.find().where("author").equals(request.user.id).populate({ path: "author", select: "firstName displayName profilePhoto" }).populate({ path: "comments.postedBy", select: "firstName displayName profilePhoto" });
    // const postsOfSelf = await Post.find().where("author").equals(request.user.id).populate("comments.postedBy");
    // const postsOfSelf = await Post.find().populate("comments.postedBy");

    const postsWithIsLiked = postsOfSelf.map((post) => {
        const isLikedByCurrentUser = post.likes.some((like) => like.user.toString() === request.user.id);
        return {
            ...post.toJSON(),
            isLikedByCurrentUser,
        };
    });
    // response.json(postsOfSelf);
    response.json(postsWithIsLiked);
});

postsRouter.get("/api/users/:userId/posts", middleware.userExtractor, async (request, response, next) => {
    const posts = await Post.find().where("author").equals(request.params.userId).populate({ path: "author", select: "firstName displayName profilePhoto" }).populate({ path: "comments.postedBy", select: "firstName displayName profilePhoto" });

    const postsWithIsLiked = posts.map((post) => {
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
        const userIdToDelete = request.user.id;
        const likeTypeToDelete = "like";

        const indexToDelete = postToUpdate.likes.findIndex((like) => like.user.toString() === userIdToDelete && like.likeType === likeTypeToDelete);

        if (indexToDelete !== -1) {
            postToUpdate.likes.splice(indexToDelete, 1);
        } else {
            postToUpdate.likes.push({ user: request.user.id, likeType: "like" });
        }

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

postsRouter.delete("/api/posts/:postId", middleware.userExtractor, async (request, response, next) => {
    // request.user.id = string
    // request.user._id = object
    const postId = request.params.postId;
    try {
        const postToDelete = await Post.findById(postId);

        if (!postToDelete) {
            // Post not found
            response.status(404).json({ message: `Post not found with id: ${postId}` });
            return;
        }

        // Get author of the post
        const authorId = postToDelete.author._id.toString();

        // Proceed deletion if the author is the same as the current user
        if (request.user.id === authorId) {
            await postToDelete.deleteOne();
            response.status(200).json({ message: `Deleted post: # ${postId}` });
        } else {
            response.status(400).json({ message: "Only author can delete post" });
        }
    } catch (error) {
        next(error);
    }
});

// DELETE /api/posts/:postId/comments/:commentId
// Requires JWT inside Authorization Bearer header
// Requires postId and commentId as params
// Returns message for notification
postsRouter.delete("/api/posts/:postId/comments/:commentId", middleware.userExtractor, async (request, response, next) => {
    //get the comment to delete
    //check if it is found
    //if found then check if the author is the current user
    //if yes then delete the comment

    const postId = request.params.postId;
    const commentId = request.params.commentId;
    const userId = request.user.id;
    try {
        const postToUpdate = await Post.findById(postId);

        if (!postToUpdate) {
            // Post not found
            response.status(404).json({ message: `Post not found with id: ${postId}` });
            return;
        }

        const commentToDelete = postToUpdate.comments.find((comment) => comment._id.toString() === commentId);

        if (!commentToDelete) {
            // Post not found
            response.status(404).json({ message: `Comment not found with id: ${commentId}` });
            return;
        }

        // Get author of the comment
        const postedBy = commentToDelete.postedBy.toString();
        console.log(postedBy);
        if (postedBy === userId) {
            postToUpdate.comments.pull({ _id: commentId });
            await postToUpdate.save();
            response.status(200).json({ message: `Deleted comment: # ${commentId}` });
        } else {
            response.status(401).json({ message: `Only author is authorized to delete comment` });
        }
    } catch (error) {
        next(error);
    }
});

// Update the posts content and postPhoto
// PATCH /api/posts/:postId
// Requires JWT inside Authorization Bearer header
// Requires object containing content and postPhoto
// Requires postId as params
// Returns the updated post
postsRouter.patch("/api/posts/:postId", middleware.userExtractor, async (request, response, next) => {
    const currentUserId = request.user.id;
    const postId = request.params.postId;
    const body = request.body;

    const newObject = {
        content: body.content,
        postPhoto: body.postPhoto,
    };

    try {
        const postToUpdate = await Post.findById(postId);

        if (!postToUpdate) {
            response.status(404).json({ message: `Post not found with id: ${postId}` });
            return;
        }

        const authorId = postToUpdate.author.toString();
        if (currentUserId === authorId) {
            const updatedPost = await Post.findByIdAndUpdate(postId, newObject, { new: true });
            response.status(200).json(updatedPost);
        } else {
            response.status(401).json({ message: `Only author is authorized to edit post` });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = postsRouter;
