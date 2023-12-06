const config = require("./utils/config");
const express = require("express");
const app = express();

//TODO try removing these 2 later
const bodyParser = require("body-parser");

const cors = require("cors");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authRouter = require("./controllers/auth");
const emailRouter = require("./controllers/email");
const characterLocationsRouter = require("./controllers/characterLocations");
const scoresRouter = require("./controllers/scores");
const postsRouter = require("./controllers/posts");

const middleware = require("./utils/middleware");
const winstonLogger = require("./utils/winstonLogger");

const mongoose = require("mongoose");

//Add session support
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const path = require("path");

mongoose.set("strictQuery", false);

// Socket.io part
const http = require("http");
// const { createServer } = require("node:http");
// const server = createServer(app);
const server = http.createServer(app);
const { Server } = require("socket.io");
// const io = new Server(server);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.onAny((eventName, ...args) => {
        console.log(eventName); // 'hello'
        console.log(args); // [ 1, '2', { 3: '4', 5: ArrayBuffer (1) [ 6 ] } ]
    });
});

io.on("connection", (socket) => {
    socket.on("join", (userRoom) => {
        socket.leaveAll();
        socket.join(userRoom);
        console.log(`user joined ${userRoom}`);
    });
    socket.on("send", (stringsent, userRoom) => {
        // console.log(stringsent);
        // socket.broadcast.emit("chat message", stringsent);
        // socket.emit("chat message", stringsent);
        // io.emit("chat message", stringsent);
        io.to(userRoom).emit("pm", stringsent);
        console.log(`sent pm ${stringsent} to ${userRoom}`);
    });
});

server.listen(3003, () => {
    console.log("server running at http://localhost:3003");
});

winstonLogger.info(`connecting to ${config.MONGODB_URI}`);

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        winstonLogger.info("Connected to MongoDB");
    } catch (error) {
        winstonLogger.error("Error connecting to MongoDB:", error.message);
    }
};
connectToMongoDB();

app.use(
    cors({
        origin: config.FRONTEND_URL,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
        optionSuccessStatus: 200,
        Headers: true,
        exposedHeaders: "Set-Cookie",
        allowedHeaders: ["Access-Control-Allow-Origin", "Content-Type", "Authorization"],
    })
);

// // // Handle all other routes by serving the index.html file
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

app.use(express.static("dist"));
// app.use(express.static(path.join(__dirname, "dist")));

// app.set("views", path.join(__dirname, "views"));

// Serve images like profile photos
// app.use(express.static("uploads"));
// app.use("/static", express.static("uploads"));

// app.use(middleware.requestLogger);
app.use((req, res, next) => {
    winstonLogger.info(`Received ${req.method} request for ${req.url}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        secret: "secr3t",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: config.SESSIONSDB_URI }),
    })
);

//Authenticate the session
// app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
//app.use(middleware.tokenExtractor); //moved the token extractor inside userextractor

app.use("/", authRouter);
app.use("/", usersRouter);
app.use("/", loginRouter);
app.use("/", emailRouter);
app.use("/", characterLocationsRouter);
app.use("/", scoresRouter);
app.use("/", postsRouter);

// Catch-all route to handle client side routing
app.use("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.use(middleware.errorHandler);

module.exports = app;
