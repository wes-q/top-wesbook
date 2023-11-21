const { MongoClient } = require("mongodb");
const { faker } = require("@faker-js/faker");

function createRandomUser() {
    const sex = faker.person.sexType();
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName();
    // const email = faker.helpers.unique(faker.internet.email, [firstName, lastName]);
    const email = faker.internet.email({ firstName, lastName });

    return {
        // _id: faker.string.uuid(),
        profilePhoto: faker.internet.avatar(sex),
        coverPhoto: faker.image.urlPicsumPhotos({ width: 851, height: 315 }),
        email,
        firstName,
        lastName,
        source: "faker",
    };
}

const user = createRandomUser();
console.log(user);

async function saveUserToMongoDB(user) {
    const uri = "mongodb+srv://wes:wes21@cluster0.ai8ufze.mongodb.net/wesbookDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("wesbookDB");
        const collection = database.collection("users");

        // Insert the user into the collection
        await collection.insertOne(user);

        console.log("User saved to MongoDB successfully!");
    } finally {
        await client.close();
    }
}

async function main() {
    const user = createRandomUser();
    console.log(user);

    // Save the user to MongoDB
    await saveUserToMongoDB(user);
}

main();
