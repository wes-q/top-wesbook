const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const { faker } = require("@faker-js/faker");

const authorObjectIds = [
    "655b72ee2dc69a64ff0e5638",
    "655b75643eae4b275c4cde72",
    "655b75a25bd0120c66ac1368",
    "655b75ba0d5f8178e07e9cee",
    "655cac0d89dd9e91b34a274b",
    "655cae531bebd35109b86da3",
    "655cae531bebd35109b86da4",
    "655cae531bebd35109b86da6",
    "655cae531bebd35109b86da7",
    "655cae531bebd35109b86da5",
    "655cbd93192f5c6e3e1ee589",
    "655cbd93192f5c6e3e1ee58b",
    "655cbd93192f5c6e3e1ee588",
    "655cbd93192f5c6e3e1ee58c",
    "655cbd93192f5c6e3e1ee58a",
    "655cbf74f9c2aacedfc38648",
    "655cbf74f9c2aacedfc3864a",
    "655cbf74f9c2aacedfc38646",
    "655cbf74f9c2aacedfc38647",
    "655cbf74f9c2aacedfc38649",
    "655d5e0834d4cbc3ab5cc3f6",
    "655d5e0834d4cbc3ab5cc3f5",
    "655d5e0834d4cbc3ab5cc3f7",
    "655d5e0834d4cbc3ab5cc3f4",
    "655d5e0834d4cbc3ab5cc3f8",
    "655d5ffc9cad1de2b1b15f21",
    "655d5ffc9cad1de2b1b15f20",
    "655d5ffc9cad1de2b1b15f1f",
    "655d5ffc9cad1de2b1b15f22",
    "655d5ffc9cad1de2b1b15f1e",
    "655d78a0e1ed1d25add769da",
    "655d78a0e1ed1d25add769dd",
    "655d78a0e1ed1d25add769d9",
    "655d78a0e1ed1d25add769dc",
    "655d78a0e1ed1d25add769db",
    "655d8db751b62d8f8ea17b9e",
    "655d8db751b62d8f8ea17b9f",
    "655d8db751b62d8f8ea17b9d",
    "655d8db751b62d8f8ea17b9c",
    "655d8db751b62d8f8ea17ba0",
    "6562ca321ee788dd6caf1c7b",
    "6562ca321ee788dd6caf1c7c",
    "6562ca321ee788dd6caf1c7d",
    "6562ca321ee788dd6caf1c7e",
    "6562ca321ee788dd6caf1c7f",
    "6562ca321ee788dd6caf1c80",
    "6562ca321ee788dd6caf1c81",
    "6562ca321ee788dd6caf1c82",
    "6562ca321ee788dd6caf1c83",
    "6562ca321ee788dd6caf1c84",
    "6562ca321ee788dd6caf1c85",
    "6562ca321ee788dd6caf1c86",
    "6562ca321ee788dd6caf1c87",
    "6562ca321ee788dd6caf1c88",
    "6562ca321ee788dd6caf1c89",
    "6562ca321ee788dd6caf1c8a",
    "6562ca321ee788dd6caf1c8b",
    "6562ca321ee788dd6caf1c8c",
    "6562ca321ee788dd6caf1c8d",
    "6562ca321ee788dd6caf1c8e",
];

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
    // const postPhoto = faker.image.urlLoremFlickr("dogs cats");

    return {
        author,
        content,
        postPhoto: faker.image.urlPicsumPhotos(),
        // postPhoto,
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
