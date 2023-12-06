const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        max: 280,
        required: true,
    },
    createdAt: {
        type: Date,
    },
});

chatMessageSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;

        if (!returnedObject.id && returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
        }

        if (!returnedObject.sender.id && returnedObject.sender._id) {
            returnedObject.sender.id = returnedObject.sender._id.toString();
            delete returnedObject.sender._id;
        }

        if (!returnedObject.recipient.id && returnedObject.recipient._id) {
            returnedObject.recipient.id = returnedObject.recipient._id.toString();
            delete returnedObject.recipient._id;
        }
    },
});

const ChatMessage = mongoose.model("chatMessage", chatMessageSchema);
module.exports = ChatMessage;
