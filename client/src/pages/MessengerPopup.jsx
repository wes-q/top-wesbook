import { useState, useEffect, useRef } from "react";
import axios from "axios";
import getUserHeaders from "../helpers/getUserHeaders";
import MessengerChat2 from "./MessengerChat2";
import { socket } from "../socket";

const MessengerPopup = ({ currentUser, chatRecipient, setShowChat }) => {
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [room, setRoom] = useState([]);
    const audioRefCoin = useRef(null);

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
        if (chatRecipient.length !== 0) {
            const generatedRoomName = generateRoomName(currentUser.firstName, chatRecipient.firstName);
            // console.log(generatedRoomName);
            socket.emit("join", generatedRoomName, currentUser.id);
            setRoom(generatedRoomName);
            fetchConversation(chatRecipient.id);
        }
    }, [chatRecipient]);

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
            <div className="w-[270px] rounded-t-lg">
                <MessengerChat2 currentUser={currentUser} messagesReceived={messagesReceived} room={room} recipient={chatRecipient} setShowChat={setShowChat} />
            </div>
        </>
    );
};

export default MessengerPopup;
