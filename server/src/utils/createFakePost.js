const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const { faker } = require("@faker-js/faker");

const authorObjectIds = ["6550b31b9738cb8925aeb966", "6550b43c9738cb8925aeb9da", "6550b4f79738cb8925aeba16", "6551af488dc715fc810930a4", "655974b5aa661554a4e17eb5", "655984f9cdf54644327b89ab", "6559855acdf54644327b89e5", "655985eacdf54644327b89e7", "655b72ee2dc69a64ff0e5638", "655b75643eae4b275c4cde72", "655b75a25bd0120c66ac1368", "655b75ba0d5f8178e07e9cee", "655cac0d89dd9e91b34a274b", "655cae531bebd35109b86da3", "655cae531bebd35109b86da4", "655cae531bebd35109b86da5", "655cae531bebd35109b86da6", "655cae531bebd35109b86da7"];
// const randomIndex = Math.floor(Math.random() * authorObjectIds.length);
// const randomIndex2 = Math.floor(Math.random() * authorObjectIds.length);

const randomIndex1 = Math.floor(Math.random() * authorObjectIds.length);
const randomIndex2 = Math.floor(Math.random() * authorObjectIds.length);
const randomIndex3 = Math.floor(Math.random() * authorObjectIds.length);

function createRandomPost() {
    const author = new ObjectId(authorObjectIds[randomIndex1]);
    const content = faker.lorem.text();
    const comment = faker.lorem.words();
    const comment2 = faker.lorem.sentence();
    const comment1Id = new ObjectId(); // Manually generate _id for comment 1
    const comment2Id = new ObjectId(); // Manually generate _id for comment 2
    const postedBy = new ObjectId(authorObjectIds[randomIndex2]);
    const postedBy2 = new ObjectId(authorObjectIds[randomIndex3]);
    const postPhoto = faker.image.urlLoremFlickr("dogs cats");

    return {
        author,
        content,
        // postPhoto: faker.image.urlPicsumPhotos(),
        postPhoto,
        comments: [
            {
                text: comment,
                postedBy: postedBy,
                _id: comment1Id,
            },
            {
                text: comment2,
                postedBy: postedBy2,
                _id: comment2Id,
            },
        ],
    };
}

async function savePostToMongoDB(post) {
    const uri = "mongodb+srv://wes:wes21@cluster0.ai8ufze.mongodb.net/wesbookDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("wesbookDB");
        const collection = database.collection("posts");

        // Insert the user into the collection
        await collection.insertOne(post);

        console.log("Post saved to MongoDB successfully!");
    } finally {
        await client.close();
    }
}

async function main() {
    const post = createRandomPost();
    console.log(post);

    // Save the user to MongoDB
    await savePostToMongoDB(post);
}

main();
