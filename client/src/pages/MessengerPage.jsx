import FriendsMessenger from "./FriendsMessenger";
import Sidebar1 from "./Sidebar1";
import Sidebar2 from "./Sidebar2";
import Footer2 from "./Footer2";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import getUserHeaders from "../helpers/getUserHeaders";
import MessengerChat from "./MessengerChat";
import { socket } from "../socket";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:3001");
// const socket = io("https://wesbook.onrender.com:443");

// socket.on("connect_error", (error) => {
//     console.error("Socket connection error:", error);
// });

// socket.on("connect_timeout", (timeout) => {
//     console.error("Socket connection timeout:", timeout);
// });

const MessengerPage = ({ currentUser, setShowFooter, setNotification }) => {
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [recipient, setRecipient] = useState([]);
    const [room, setRoom] = useState([]);
    const audioRefCoin = useRef(null);

    useEffect(() => {
        setShowFooter(false);

        return () => {
            setShowFooter(true);
        };
    }, []);

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
        if (recipient.length !== 0) {
            const generatedRoomName = generateRoomName(currentUser.firstName, recipient.firstName);
            // console.log(generatedRoomName);
            socket.emit("join", generatedRoomName, currentUser.id);
            setRoom(generatedRoomName);
            fetchConversation(recipient.id);
        }
    }, [recipient]);

    useEffect(() => {
        socket.on("pm", (msg, userId) => {
            setMessagesReceived((prevMessages) => [...prevMessages, { message: msg, sender: userId }]);

            if (audioRefCoin.current && userId !== currentUser.id) {
                audioRefCoin.current.currentTime = 0;
                audioRefCoin.current.play();
            }
        });
        // return () => {
        //     socket.off("connect", onConnect);
        //     socket.off("disconnect", onDisconnect);
        //     socket.off("foo", onFooEvent);
        // };
    }, []);

    return (
        <>
            <audio ref={audioRefCoin}>
                <source src="/mixkit-retro-game-notification-212.wav" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div className="relative py-4">
                <div className="flex lg:justify-center relative gap-0 md:gap-4 px-3">
                    <div className="block lg:hidden md:w-72">
                        <FriendsMessenger currentUser={currentUser} setRecipient={setRecipient} recipient={recipient} />
                    </div>
                    <div className="hidden lg:block">
                        <div className="lg:flex flex-col w-72 sticky top-20">
                            <Sidebar1 currentUser={currentUser} setNotification={setNotification} />
                            <Sidebar2 />
                            {/* <Footer2 /> */}
                        </div>
                    </div>
                    {/* <div className="lg:max-w-[33vw] min-w-[200px] grow"> */}
                    <div className="lg:max-w-[33vw] grow">
                        {/* 573px */}
                        <MessengerChat currentUser={currentUser} messagesReceived={messagesReceived} room={room} recipient={recipient} />
                    </div>
                    <div className="hidden lg:block w-72">
                        <FriendsMessenger currentUser={currentUser} setRecipient={setRecipient} recipient={recipient} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessengerPage;
