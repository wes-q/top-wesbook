import { useState, useRef, useEffect } from "react";
import FriendsMessenger from "./FriendsMessenger";
// import { io } from "socket.io-client";
import { socket } from "../socket";
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:3003");
import axios from "axios";
import getUserHeaders from "../helpers/getUserHeaders";

const MessengerPage = ({ currentUser }) => {
    const [message, setMessage] = useState([]);
    const [messagesReceived, setMessagesReceived] = useState([]);

    const [recipient, setRecipient] = useState([]);
    const [room, setRoom] = useState([]);

    const textAreaRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() !== "") {
            // setMessages([...messages, inputValue]);
            socket.emit("send", message, room, currentUser.id); // Send instant message to related client instance
            saveMessage(message, recipient.id); // Save message to the database
            setMessage(""); // Reset the input field and state
        }
    };

    function generateRoomName(id1, id2) {
        let room;
        const result = id1.localeCompare(id2);

        if (result < 0) {
            room = `${id1}_${id2}`;
        } else if (result > 0) {
            room = `${id2}_${id1}`;
        } else {
            room = `${id1}_${id2}`;
        }
        return room;
    }

    useEffect(() => {
        socket.on("pm", (msg, userId) => {
            setMessagesReceived((prevMessages) => [...prevMessages, { message: msg, sender: userId }]);
        });
        // return () => {
        //     socket.off("connect", onConnect);
        //     socket.off("disconnect", onDisconnect);
        //     socket.off("foo", onFooEvent);
        // };
    }, []);

    const saveMessage = async (message, recipient) => {
        const headers = getUserHeaders();
        const url = `/api/chats/`;
        const object = {
            message: message,
            recipient: recipient,
        };
        try {
            await axios.post(url, object, { headers });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchConversation = async (userId) => {
        const headers = getUserHeaders();

        try {
            const conversation = await axios.get(`/api/chats/${userId}`, { headers });
            console.log(conversation.data);
            setMessagesReceived(conversation.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const generatedRoomName = generateRoomName(currentUser.firstName, recipient.firstName);
        console.log(generatedRoomName);
        socket.emit("join", generatedRoomName, currentUser.id);
        setRoom(generatedRoomName);
        fetchConversation(recipient.id);
    }, [recipient]);

    const autoGrow = (element) => {
        if (!element.current) {
            return;
        }
        element.current.style.height = element.current.scrollHeight + "px";
    };

    return (
        <div className="flex">
            <FriendsMessenger currentUser={currentUser} setRecipient={setRecipient} />
            {/* <div>
                <span>Chatting with:</span>
                <img className="w-10 h-10 object-cover rounded-full" src={recipient.profilePhoto} alt="" />
                <span className="truncate">{recipient.displayName || recipient.firstName}</span>
            </div> */}
            <div className="dark:bg-dark-c w-[900px] p-3">
                <div className="h-full overflow-auto">
                    {messagesReceived.map((message, index) => {
                        let style;
                        if (message.sender === currentUser.id) {
                            style = "flex justify-end";
                        } else {
                            style = "flex justify-start";
                        }
                        return (
                            <div key={index} className={style}>
                                {/* <div className="bg-primary max-w-[50%] rounded-2xl px-4 py-1 mb-1"> */}
                                <div className={message.sender === currentUser.id ? "bg-primary dark:bg-primaryDark max-w-[50%] rounded-2xl px-4 py-1 mb-1" : "bg-light-b dark:bg-dark-b max-w-[50%] rounded-2xl px-4 py-1 mb-1"}>
                                    <span className="break-words">{message.message}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <form className="flex gap-2 max-h-32 border border-red-400 box-border backdrop-filter backdrop-blur-md bg-transparent" onSubmit={handleSubmit}>
                    {/* <input id="input" type="text" value={message} onChange={(event) => setMessage(event.target.value)} autoComplete="off" spellCheck="false" className="bg-light-b dark:bg-dark-b border-none px-4 py-1 flex-grow rounded-full focus:outline-none" /> */}
                    <textarea ref={textAreaRef} className="w-full h-12 bg-dark-a outline-none resize-none mb-4 overflow-y-auto max-h-32" cols="30" rows="5" placeholder="What's on your mind?" spellCheck="false" autoFocus onChange={(event) => setMessage(event.target.value)} onInput={autoGrow(textAreaRef)} />
                    {/* <textarea  className="w-full bg-transparent outline-none resize-none mb-4 overflow-hidden max-h-64" id="" cols="30" rows="3" placeholder="What's on your mind?" spellCheck="false" onChange={handleTextChange} onInput={autoGrow(textAreaRef)}></textarea> */}
                    <button type="submit" className="bg-light-a dark:bg-dark-a border-none p-2 m-0.25 rounded-md outline-none">
                        Send
                    </button>
                </form>
            </div>
        </div>
        // <>
        //     <input
        //         type="text"
        //         placeholder="Message..."
        //         value={message}
        //         onChange={(event) => {
        //             setMessage(event.target.value);
        //         }}
        //     />
        //     <button onClick={sendMessage}>Send Message</button>
        //     <h1>Message</h1>
        //     {messageReceived}
        // </>
    );
};

export default MessengerPage;
