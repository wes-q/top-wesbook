const User = require("../models/user");
const mongoose = require("mongoose");
const uri = "mongodb+srv://wes:wes21@cluster0.ai8ufze.mongodb.net/wesbookDB?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
    }
};

const closeMongoDBConnection = async () => {
    try {
        await mongoose.connection.close();
        console.log("MongoDB connection closed");
    } catch (error) {
        console.log("Error closing MongoDB connection:", error.message);
    }
};

connectToMongoDB();

async function main() {
    try {
        const users = await User.find({}, "_id").where({ source: "faker" });

        // Extract _id values into an array of strings
        const userIds = users.map((user) => user._id.toString());
        console.log(userIds);
    } catch (error) {
        console.error("Error in main function:", error.message);
    } finally {
        // Close the MongoDB connection after the main function executes
        await closeMongoDBConnection();
    }
}

main();
