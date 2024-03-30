const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const { body } = require("express-validator");

const User = require("../models/user");
const config = require("../utils/config");
const { validateRequestSchema, userExtractor } = require("../utils/middleware");
const appendVirtualFields = require("../utils/appendVirtualFields");

// const path = require("path");
// const fs = require("fs");

const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    secure: true,
});
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads");
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
//     },
// });
const storage = multer.memoryStorage();

async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return res;
}

const upload = multer({ storage: storage });

// Uploads profile photo file to the uploads folder
// usersRouter.post("/profile", upload.single("image"), function (req, res, next) {
//     console.log(`FILE UPLOADED: ${req.file}`);
//     // res.status(200).json(req.file);
//     res.status(200).json({ message: "Image uploaded to Cloudinary!", public_id: req.file.public_id });
// });

// Delete file from server's file storage.  Removed because app is now using Cloudinary to store
// usersRouter.post("/profile-delete", function (req, res, next) {
//     const filePath = req.body.filePath;
//     console.log(req.body.filePath);
//     if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//         console.log(`File ${filePath} has been deleted.`);
//         res.status(200).send(`File ${filePath} has been deleted.`);
//     } else {
//         console.log(`File ${filePath} does not exist.`);
//         res.status(200).send(`File ${filePath} does not exist.`);
//     }
// });

usersRouter.get("/users", async (request, response, next) => {
    try {
        const users = await User.find({});
        // const users = await User.find({}).select("email").populate({
        //     path: "friends.friendId",
        //     // select: "friends.status",
        // });

        response.json(users);
    } catch (error) {
        next(error);
    }
});

usersRouter.post(
    "/users",
    body("email").escape().notEmpty().withMessage("Email is required").isEmail().withMessage("Please provide a valid email"),
    body("displayName").escape().trim().notEmpty().withMessage("Display name is required"),
    body("password").escape().notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Password length minimum of 8 characters"),
    validateRequestSchema,

    async (request, response, next) => {
        const { displayName, password, email } = request.body;
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const verificationToken = await bcrypt.hash(email, saltRounds);
        const source = "local";
        const isVerified = false;

        try {
            const user = new User({
                email,
                displayName,
                passwordHash,
                source,
                isVerified,
                verificationToken,
                // uploadPhoto,
            });

            const savedUser = await user.save();
            return response.json(savedUser);
        } catch (error) {
            //MONGOOSE ERRORS go here when save fails
            return next(error);
        }
    }
);

// Exclude self, friends, users with pending requests
usersRouter.get("/users/eligible-friends", userExtractor, async (req, res, next) => {
    try {
        const eligibleUsers = await User.find().where("_id").ne(req.user.id).where("friendRequests.friendId").ne(req.user.id).where("friendRejects.friendId").ne(req.user.id).where("friends.friendId").ne(req.user.id);
        // console.log(eligibleUsers);
        res.status(200).json(eligibleUsers);
    } catch (error) {
        next(error);
    }
});

// usersRouter.get("/users/friends", userExtractor, async (req, res, next) => {
//     const friendIds = req.user.friends.map((friend) => {
//         return {
//             friendId: friend.friendId,
//         };
//     });
//     res.status(200).json(friendIds);
// });

// Incoming friend requests
// Check the currentUsers request list for all the ids
usersRouter.get("/users/incoming-friends", userExtractor, async (req, res, next) => {
    try {
        const userWithPopulatedFriends = await User.findById(req.user.id).populate("friendRequests.friendId", "email displayName firstName lastName profilePhoto").exec();

        const populatedFriends = userWithPopulatedFriends.friendRequests.map((friend) => {
            const { friendId } = friend;
            const { id, displayName, firstName, lastName, profilePhoto, email } = friendId;
            return { id, displayName, firstName, lastName, profilePhoto, email };
        });

        res.status(200).json(populatedFriends);
    } catch (error) {
        next(error);
    }
});

// Outgoing friend requests
// Check each user request list in the database if it contains the currentUser's id
usersRouter.get("/users/pending-friends", userExtractor, async (req, res, next) => {
    try {
        const pendingFriends = await User.find({
            "friendRequests.friendId": req.user.id,
            "friends.friendId": { $ne: req.user.id }, // exclude if already friend
        }).exec();

        // const mappedFriends = pendingFriends.map(({ id, displayName, lastName, profilePhoto, email, firstName }) => {
        //     return { id, displayName, firstName, lastName, profilePhoto, email };
        // });

        res.status(200).json(pendingFriends);
        // res.status(200).json(mappedFriends);
    } catch (error) {
        next(error);
    }
});

usersRouter.get("/users/:id", userExtractor, async (request, response, next) => {
    const currentUserId = request.user.id;
    let status;

    try {
        const user = await User.findById(request.params.id);
        const isFriends = user.friends.some((friend) => friend.friendId.toString() === currentUserId);
        const isPending = user.friendRequests.some((friend) => friend.friendId.toString() === currentUserId);

        if (user.id === currentUserId) {
            status = "self";
        } else if (isFriends) {
            status = "friend";
        } else if (isPending) {
            status = "pending";
        } else {
            status = "notFriend";
        }

        const userWithStatus = [user].map((user) => {
            const totalFriends = user.totalFriends;
            return {
                ...user.toJSON(),
                status,
                totalFriends,
            };
        });

        response.json(userWithStatus[0]);
    } catch (error) {
        next(error);
    }
});

// Get all of the users' confirmed friends
usersRouter.get("/users/:userId/friends", userExtractor, async (req, res, next) => {
    try {
        // Use the User model to create a Mongoose query for populating the 'friends' field
        const userWithPopulatedFriends = await User.findById(req.params.userId).populate("friends.friendId").exec();
        // res.json(userWithPopulatedFriends);

        // Extract the populated friend data
        const populatedFriends = userWithPopulatedFriends.friends.map((friend) => {
            const { friendId } = friend;
            // Add any other fields you want to extract from the populated friend object
            const { id, displayName, firstName, lastName, profilePhoto, email } = friendId;
            // return { friendId, displayName, firstName, profilePhoto, email };
            return { id, displayName, firstName, lastName, profilePhoto, email };
        });

        res.status(200).json(populatedFriends);
    } catch (error) {
        next(error);
    }
});

usersRouter.put("/users/:id", userExtractor, async (request, response, next) => {
    const currentUserId = request.user.id;
    const userToUpdateId = request.params.id;

    if (currentUserId !== userToUpdateId) {
        response.status(401).json({ message: `Only the same user is authorized to update their info` });
        return;
    }

    const body = request.body;
    const user = {
        displayName: body.displayName,
        lastName: body.lastName,
        firstName: body.firstName,
        profilePhoto: body.profilePhoto,
        coverPhoto: body.coverPhoto,
        bio: body.bio,
        gender: body.gender,
        livesIn: body.livesIn,
        worksAt: body.worksAt,
        jobTitle: body.jobTitle,
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(userToUpdateId, user, { new: true });
        const appendedUser = appendVirtualFields(updatedUser, currentUserId);
        response.status(201).json(appendedUser[0]);
    } catch (error) {
        next(error);
    }
});

// Create a friend request
// Requires JWT inside Authorization Bearer header
// Requires object with toUserId: String
usersRouter.post("/friend-requests", userExtractor, async (req, res, next) => {
    try {
        const { toUserId } = req.body;
        const fromUserId = req.user.id;
        const fromUser = await User.findById(fromUserId);
        const toUser = await User.findById(toUserId);

        // Check if the users exist
        if (!fromUser || !toUser) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check if the friend request already exists
        if (toUser.friendRequests.some((friend) => friend.friendId.toString() === fromUserId)) {
            return res.status(400).json({ message: "Friend request already sent" });
        }

        // Send a user's id to a users friendRequest array
        toUser.friendRequests.push({ friendId: fromUserId });
        const updatedUser = await toUser.save();

        const appendedUser = appendVirtualFields(updatedUser, fromUserId);
        res.status(201).json(appendedUser[0]);
    } catch (error) {
        next(error);
    }
});

// Cancel a friend request
usersRouter.post("/friend-requests/:id/cancel", userExtractor, async (req, res, next) => {
    const currentUserId = req.user.id;
    const userIdToDelete = req.user.id;
    const userToUpdate = await User.findById(req.params.id);

    try {
        const indexToDelete = userToUpdate.friendRequests.findIndex((friendReq) => friendReq.friendId.toString() === userIdToDelete);

        if (indexToDelete !== -1) {
            userToUpdate.friendRequests.splice(indexToDelete, 1);
        }
        const updatedUser = await userToUpdate.save();

        const appendedUser = appendVirtualFields(updatedUser, currentUserId);
        res.status(200).json(appendedUser[0]);
    } catch (error) {
        next(error);
    }
});

// Accept a friend request
usersRouter.put("/friend-requests/:id/accept", userExtractor, async (req, res, next) => {
    const friendRequestSenderId = req.params.id;
    const friendRequestRecipient = req.user;
    const friendRequestRecipientId = req.user.id;

    try {
        const friendRequestSender = await User.findById(friendRequestSenderId);

        // Check if the current user / recipient has a friend request with the given senders id
        if (friendRequestRecipient.friendRequests.some((friend) => friend.friendId.toString() === friendRequestSenderId)) {
            // Add the requestor's ID to the friends array of both the requestor and the requestee to signify a confirmed friend
            friendRequestSender.friends.push({ friendId: friendRequestRecipientId });
            friendRequestRecipient.friends.push({ friendId: friendRequestSenderId });
            await friendRequestSender.save();
            await friendRequestRecipient.save();

            // Remove the friend request from the recipient's friendRequests array
            await friendRequestRecipient.updateOne({ $pull: { friendRequests: { friendId: friendRequestSenderId } } }).exec();
            await friendRequestSender.updateOne({ $pull: { friendRequests: { friendId: friendRequestRecipientId } } }).exec();
        } else {
            res.status(400).json({ message: "No actual request to accept" });
        }
        res.status(200).json({ message: `User ${friendRequestRecipientId} has accepted friend request from ${friendRequestSenderId}` });
    } catch (error) {
        next(error);
    }
});

// Reject a friend request
usersRouter.put("/friend-requests/:id/reject", userExtractor, async (req, res, next) => {
    const friendRequestSenderId = req.params.id;
    const friendRequestRecipient = req.user;
    const friendRequestRecipientId = req.user.id;

    try {
        const friendRequestSender = await User.findById(friendRequestSenderId);

        // Check if the current user / recipient has a friend request with the given senders id
        if (friendRequestRecipient.friendRequests.some((friend) => friend.friendId.toString() === friendRequestSenderId)) {
            // Remove the friend request from the recipient's friendRequests array
            await friendRequestRecipient.updateOne({ $pull: { friendRequests: { friendId: friendRequestSenderId } } }).exec();
            await friendRequestSender.updateOne({ $pull: { friendRequests: { friendId: friendRequestRecipientId } } }).exec();
        } else {
            res.status(400).json({ message: "No actual request to reject" });
        }
        res.status(200).json({ message: `User ${friendRequestRecipientId} has rejected friend request from ${friendRequestSenderId}` });
    } catch (error) {
        next(error);
    }
});

usersRouter.get("/verify-email", async (req, res) => {
    const token = req.query.token;

    // if the user is already verified, then show a different page
    const user = await User.findOne({ verificationToken: token });
    if (user.isVerified) {
        res.redirect(`${config.FRONTEND_URL}/verification-nothing`);
    } else {
        user.isVerified = true;
        await user.save();
        res.redirect(`${config.FRONTEND_URL}/verification-successful`);
    }
    // res.status(200).json(`${user.email} is now verified`);
});

usersRouter.post("/uploadImage", upload.single("image"), async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        res.status(200).json(cldRes.secure_url);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: error.message,
        });
    }
});

module.exports = usersRouter;
