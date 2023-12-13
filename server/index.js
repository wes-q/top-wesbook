// const app = require("./src/app"); // the actual Express application
// const config = require("./src/utils/config");
// const logger = require("./src/utils/logger");

// app.listen(config.PORT, () => {
//     logger.info(`Server running on port ${config.PORT}`);
// });

const app = require("./src/app");
const config = require("./src/utils/config");
const logger = require("./src/utils/logger");
const http = require("http"); // Import the http module

const server = http.createServer(app); // Create an http server using the Express app

/* Socket.IO setup */
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: config.FRONTEND_URL,
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
    socket.on("join", (userRoom, userId) => {
        socket.leaveAll();
        socket.join(userRoom);
        console.log(`${userId} joined ${userRoom}`);
    });
    socket.on("send", (stringsent, userRoom, userId) => {
        // console.log(stringsent);
        // socket.broadcast.emit("chat message", stringsent);
        // socket.emit("chat message", stringsent);
        // io.emit("chat message", stringsent);
        io.to(userRoom).emit("pm", stringsent, userId);
        console.log(`${userId} sent pm ${stringsent} to ${userRoom}`);
    });
});

// io.on("connection", (socket) => {
//     const transport = socket.conn.transport.name; // in most cases, "polling"
//     console.log("TRANSPORT");
//     console.log(transport);

//     socket.conn.on("upgrade", () => {
//         const upgradedTransport = socket.conn.transport.name; // in most cases, "websocket"
//         console.log("UPGRADED TRANSPORT");
//         console.log(upgradedTransport);
//     });
// });

/* Start the combined server */
server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});
