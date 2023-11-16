const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
        max: 280,
    },
    postPhoto: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            likeType: {
                type: String,
                enum: ["like", "love", "care", "haha"],
            },
        },
    ],
    comments: [
        {
            text: String,
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        },
    ],
});

postSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;

        if (!returnedObject.id && returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
        }

        if (returnedObject.likes) {
            returnedObject.likes.forEach((like) => {
                if (!like.id && like._id) like.id = like._id.toString();
                delete like._id;
            });
        }
        if (returnedObject.comments) {
            returnedObject.comments.forEach((comment) => {
                if (!comment.id && comment._id) comment.id = comment._id.toString();
                delete comment._id;
            });
        }
    },
});

module.exports = mongoose.model("Post", postSchema);
