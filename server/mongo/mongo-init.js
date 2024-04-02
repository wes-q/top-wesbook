// Creates
// 1) user with password
// 2) database
// 3) collection
// 4) 2 documents

db.createUser({
    user: "the_username",
    pwd: "the_password",
    roles: [
        {
            role: "dbOwner",
            db: "wesbookDB",
        },
    ],
});

// db.createCollection("todos");

// db.todos.insert({ text: "Write code", done: true });
// db.todos.insert({ text: "Learn about containers", done: false });
