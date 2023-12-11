import FriendsMessenger from "./FriendsMessenger";
import Sidebar1 from "./Sidebar1";
import Sidebar2 from "./Sidebar2";
import Footer2 from "./Footer2";
import { useState, useEffect, useRef } from "react";
import { socket } from "../socket";
import axios from "axios";
import getUserHeaders from "../helpers/getUserHeaders";
import MessengerChat from "./MessengerChat";

const MessengerPage2 = ({ currentUser, setShowFooter }) => {
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
        const generatedRoomName = generateRoomName(currentUser.firstName, recipient.firstName);
        // console.log(generatedRoomName);
        socket.emit("join", generatedRoomName, currentUser.id);
        setRoom(generatedRoomName);
        fetchConversation(recipient.id);
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
            <div className="relative">
                <div className="flex sm:gap-4 justify-center max-w-max mx-auto relative pt-3 px-3">
                    <div className="">
                        <div className="hidden sm:flex flex-col w-72 sticky top-20">
                            <Sidebar1 currentUser={currentUser} />
                            <Sidebar2 />
                            {/* <Footer2 /> */}
                        </div>
                    </div>
                    <MessengerChat currentUser={currentUser} messagesReceived={messagesReceived} room={room} recipient={recipient} />
                    <div className="hidden sm:block">
                        <FriendsMessenger currentUser={currentUser} setRecipient={setRecipient} recipient={recipient} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessengerPage2;
