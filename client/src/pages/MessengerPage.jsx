// import { useState, useRef, useEffect } from "react";
// import FriendsMessenger from "./FriendsMessenger";
// // import { io } from "socket.io-client";
// import { socket } from "../socket";
// // import io from "socket.io-client";
// // const socket = io.connect("http://localhost:3003");
// import axios from "axios";
// import getUserHeaders from "../helpers/getUserHeaders";

// const MessengerPage = ({ currentUser }) => {
//     const [message, setMessage] = useState([]);
//     const [messagesReceived, setMessagesReceived] = useState([]);

//     const [recipient, setRecipient] = useState([]);
//     const [room, setRoom] = useState([]);

//     const textAreaRef = useRef(null);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (message.trim() !== "") {
//             // setMessages([...messages, inputValue]);
//             socket.emit("send", message, room, currentUser.id); // Send instant message to related client instance
//             saveMessage(message, recipient.id); // Save message to the database
//             setMessage(""); // Reset the input field and state
//         }
//     };

//     function generateRoomName(id1, id2) {
//         let room;
//         const result = id1.localeCompare(id2);

//         if (result < 0) {
//             room = `${id1}_${id2}`;
//         } else if (result > 0) {
//             room = `${id2}_${id1}`;
//         } else {
//             room = `${id1}_${id2}`;
//         }
//         return room;
//     }

//     useEffect(() => {
//         socket.on("pm", (msg, userId) => {
//             setMessagesReceived((prevMessages) => [...prevMessages, { message: msg, sender: userId }]);
//         });
//         // return () => {
//         //     socket.off("connect", onConnect);
//         //     socket.off("disconnect", onDisconnect);
//         //     socket.off("foo", onFooEvent);
//         // };
//     }, []);

//     const saveMessage = async (message, recipient) => {
//         const headers = getUserHeaders();
//         const url = `/api/chats/`;
//         const object = {
//             message: message,
//             recipient: recipient,
//         };
//         try {
//             await axios.post(url, object, { headers });
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const fetchConversation = async (userId) => {
//         const headers = getUserHeaders();

//         try {
//             const conversation = await axios.get(`/api/chats/${userId}`, { headers });
//             console.log(conversation.data);
//             setMessagesReceived(conversation.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         const generatedRoomName = generateRoomName(currentUser.firstName, recipient.firstName);
//         console.log(generatedRoomName);
//         socket.emit("join", generatedRoomName, currentUser.id);
//         setRoom(generatedRoomName);
//         fetchConversation(recipient.id);
//     }, [recipient]);

//     const autoGrow = (element) => {
//         if (!element.current) {
//             return;
//         }
//         element.current.style.height = element.current.scrollHeight + "px";
//     };

//     return (
//         <div className="flex">
//             <FriendsMessenger currentUser={currentUser} setRecipient={setRecipient} />
//         </div>
//     );
// };

// export default MessengerPage;
