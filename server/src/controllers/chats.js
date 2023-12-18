const chatsRouter = require("express").Router();
const Chat = require("../models/chat");
const middleware = require("../utils/middleware");

// Get quantity of new chats
chatsRouter.get("/api/chats/count-new-chats", middleware.userExtractor, async (request, response, next) => {
    const currentUserId = request.user.id;
    try {
        const result = await Chat.countDocuments({ read: false, recipient: currentUserId });
        response.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

// Fetch all chat messages between two users (self and another user) sorted by date
chatsRouter.get("/api/chats/:userId", middleware.userExtractor, async (request, response, next) => {
    const currentUserId = request.user.id;
    const anotherUserId = request.params.userId;
    // console.log(currentUserId);
    // console.log(anotherUserId);
    try {
        // const conversation = await Chat.find({}).where("sender").equals(currentUserId);
        const conversation = await Chat.find()
            .where({
                $or: [
                    { sender: currentUserId, recipient: anotherUserId },
                    { sender: anotherUserId, recipient: currentUserId },
                ],
            })
            .sort({ createdAt: "asc" });
        response.json(conversation);
    } catch (error) {
        next(error);
    }
});

// Save a chat document
chatsRouter.post("/api/chats", middleware.userExtractor, async (request, response, next) => {
    // console.log("API CHATS");
    const currentUserId = request.user.id;
    // console.log(currentUserId);

    try {
        const body = request.body;
        const currentDate = new Date().toISOString(); // Generates the current date and time in ISO 8601 format

        const chat = new Chat({
            sender: currentUserId,
            recipient: body.recipient,
            message: body.message,
            createdAt: currentDate,
        });

        const savedChat = await chat.save();
        response.status(200).json(savedChat);
    } catch (error) {
        next(error);
    }
});

// Set all chats of a certain sender and recipient to read true status
chatsRouter.patch("/api/chats/:userId", middleware.userExtractor, async (request, response, next) => {
    const currentUserId = request.user.id;
    const senderUserId = request.params.userId;
    try {
        const result = await Chat.updateMany({ read: false, recipient: currentUserId, sender: senderUserId }, { read: true });
        response.status(200).json(result.modifiedCount);
    } catch (error) {
        next(error);
    }
});

// characterLocationsRouter.get("/api/characterLocations/:id", (request, response, next) => {
//     Person.findById(request.params.id)
//         .then((person) => {
//             if (person) {
//                 response.json(person);
//             } else {
//                 response.status(404).send("<h1>Person not found</h1>");
//             }
//         })
//         .catch((error) => next(error));
// });

// anecdotesRouter.delete("/api/persons/:id", (request, response, next) => {
//     Person.findByIdAndRemove(request.params.id)
//         // eslint-disable-next-line no-unused-vars
//         .then((result) => {
//             response.status(204).end();
//         })
//         .catch((error) => next(error));
// });

// anecdotesRouter.put("/api/persons/:id", (request, response, next) => {
//     const body = request.body;

//     const person = {
//         name: body.name,
//         number: body.number,
//     };

//     Person.findByIdAndUpdate(request.params.id, person, { new: true })
//         .then((updatedPerson) => {
//             response.json(updatedPerson);
//         })
//         .catch((error) => next(error));
// });

module.exports = chatsRouter;
