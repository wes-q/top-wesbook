let mongoose = require("mongoose");
const emailValidator = require("email-validator");

const userSchema = new mongoose.Schema({
    providerId: String,
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            // {
            //     validator: async function (email) {
            //         // If the user is verified, check for email uniqueness
            //         if (this.isVerified) {
            //             const user = await mongoose.models.User.findOne({ email, isVerified: true });
            //             return !user; // Return true if no other verified user has this email
            //         }
            //         return true; // Return true for unverified users
            //     },
            //     message: "Email address must be unique for verified users.",
            // },
            {
                validator: function (value) {
                    return emailValidator.validate(value);
                },
                message: "Invalid email format",
            },
        ],
    },
    passwordHash: String,
    displayName: String,
    firstName: String,
    lastName: String,
    profilePhoto: String,
    // uploadPhoto: File,
    source: { type: String, required: [true, "source not specified"] },
    lastVisited: { type: Date, default: new Date() },
    isVerified: Boolean,
    verificationToken: String,
    friends: [
        {
            timestamp: {
                type: Date,
                default: Date.now,
            },
            friendId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        },
    ],
    friendRequests: [
        {
            timestamp: {
                type: Date,
                default: Date.now,
            },
            friendId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        },
    ],
    friendRejects: [
        {
            timestamp: {
                type: Date,
                default: Date.now,
            },
            friendId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        },
    ],
    // notifications: [
    //     {
    //         type: String, // e.g., 'friend_request', 'message', 'block', etc.
    //         fromUser: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "User",
    //         },
    //         status: {
    //             type: String, // 'read', 'unread', etc.
    //             default: "unread",
    //         },
    //     },
    // ],
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        // returnedObject.id = returnedObject._id.toString();
        if (returnedObject) {
            returnedObject.id = returnedObject._id ? returnedObject._id.toString() : null;
            delete returnedObject._id;
            delete returnedObject.__v;
            // the passwordHash should not be revealed
            delete returnedObject.passwordHash;
            // the verification token should not be revealed
            delete returnedObject.verificationToken;
        }

        if (returnedObject.friendRequests) {
            returnedObject.friendRequests.forEach((friendReq) => {
                if (!friendReq.id && friendReq._id) friendReq.id = friendReq._id.toString();
                delete friendReq._id;
            });
        }
    },
});

// module.exports = mongoose.model("User", userSchema);

const User = mongoose.model("User", userSchema);
module.exports = User;
