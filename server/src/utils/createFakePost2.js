const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const Post = require("../models/post");
const { faker } = require("@faker-js/faker");

const authorObjectIds = ["655b72ee2dc69a64ff0e5638"];

const connectToMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://wes:wes21@cluster0.ai8ufze.mongodb.net/wesbookDB?retryWrites=true&w=majority");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
    }
};

async function main() {
    connectToMongoDB();
    const content = faker.lorem.text();
    const createdAt = new Date();
    const author = new ObjectId(authorObjectIds[0]);

    const post = new Post({
        content,
        author,
        // createdAt,
        postPhoto: faker.image.urlPicsumPhotos(),
    });

    const savedPost = await post.save();
    console.log(savedPost);
}

main();
