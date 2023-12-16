import { useState, useRef, useEffect } from "react";
import Send from "../icons/send.svg?react";
import getUserHeaders from "../helpers/getUserHeaders";
import axios from "axios";
import noProfilePhoto from "../icons/noprofile.jpg";
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

const MessengerChat = ({ messagesReceived, room, currentUser, recipient }) => {
    const [message, setMessage] = useState("");
    const [postIconStyle, setPostIconStyle] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    // const [marginPush, setMarginPush] = useState("");
    const textAreaRef = useRef(null);
    const messagesEndRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isDisabled) {
            return;
        }
        if (message.trim() !== "") {
            // setMessages([...messages, inputValue]);
            socket.emit("send", message, room, currentUser.id); // Send instant message to related client instance
            saveMessage(message, recipient.id); // Save message to the database
            setMessage(""); // Reset the input field and state
            textAreaRef.current.focus();
            setIsDisabled(true);
        }
    };

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

    const autoGrow = (element) => {
        if (!element.current) {
            return;
        }
        // if (showPlaceholder) {
        //     element.current.style.height = "0px";
        // }
        element.current.style.height = element.current.scrollHeight + "px";
        // setMarginPush(element.current.scrollHeight + "px");
    };

    useEffect(() => {
        const isTextareaEmpty = (value) => {
            // Trim the value and check if it's an empty string
            return value.trim() === "";
        };
        const isTextareaSomewhatEmpty = (value) => {
            // Trim the value and check if it's an empty string
            return value === "";
        };

        const x = isTextareaEmpty(message);
        if (isTextareaSomewhatEmpty(message)) {
            setShowPlaceholder(true);
        } else {
            setShowPlaceholder(false);
        }

        if (!x) {
            setPostIconStyle("fill-primary dark:fill-primaryDark hover:cursor-pointer");
            setIsDisabled(false);
        } else {
            setPostIconStyle("hover:cursor-not-allowed fill-current");
            setIsDisabled(true);
        }
    }, [message]);

    const handleChange = (event) => {
        setMessage(event.target.value);
        autoGrow(textAreaRef);
    };

    // useEffect(() => {
    //     // Scroll to the bottom when messagesReceived changes
    //     if (chatContainerRef.current) {
    //         chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    //     }
    // }, [messagesReceived]);

    useEffect(() => {
        // document.getElementById("ElementID").scrollIntoView();
        // or, use a ref and
        // chatContainerRef.current.scrollIntoView({ behavior: "smooth" });

        messagesEndRef.current?.scrollIntoView(true);
    }, [messagesReceived]);

    // const scrollToBottom = () => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // };

    return (
        // <div className={`flex flex-col bg-light-c dark:bg-dark-c sm:w-[573px] p-3 text-xs mb-[${marginPush}]`}>
        <>
            {recipient.length === 0 ? (
                <div className="flex flex-col items-center justify-center">
                    {/* <div className="flex flex-col items-center justify-center sm:w-[573px]"></div> */}
                    <i
                        className="block bg-cover bg-no-repeat sm:w-72 sm:h-52 w-36 h-24"
                        style={{
                            backgroundImage: 'url("https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/uJKYQg0NhYr.png")',
                            backgroundPosition: "0px 0px",
                            // backgroundPosition: "0px -211px",
                        }}
                    ></i>
                    <span>No chats selected</span>
                </div>
            ) : (
                <div className="flex flex-col relative bg-light-c dark:bg-dark-c py-3 text-xs mb-[50px] justify-end mt-20">
                    <div className="">
                        {messagesReceived.length === 0 && (
                            <div className="flex justify-center">
                                <span>No chats with this friend yet</span>
                            </div>
                        )}
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
                                    {/* <div className={message.sender === currentUser.id ? "bg-primary dark:bg-primaryDark max-[450px]:max-w-[200px] max-w-[300px] rounded-2xl px-3 py-1 mb-1" : "bg-light-b dark:bg-dark-b max-[450px]:max-w-[200px] max-w-[300px] rounded-2xl px-3 py-1 mb-1"}> */}
                                    <div className={message.sender === currentUser.id ? "bg-primary dark:bg-primaryDark max-[450px]:max-w-[200px] max-w-[300px] rounded-2xl px-3 py-1 mb-1" : "bg-light-b dark:bg-dark-b max-[450px]:max-w-[200px] max-w-[300px] rounded-2xl px-3 py-1 mb-1"}>
                                        <span className="break-words whitespace-pre-wrap">{message.message}</span>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                    <form className="fixed bottom-[48px] md:bottom-0 w-full custom-max-width lg:max-w-[33vw] flex items-end gap-2 bg-light-c dark:bg-dark-c py-6 pr-3" onSubmit={handleSubmit}>
                        {/* <textarea ref={textAreaRef} className="w-full max-h-32 bg-light-a dark:bg-dark-a rounded-2xl outline-none resize-none overflow-y-auto px-3 py-2" placeholder={showPlaceholder ? "Aa" : ""} spellCheck="false" autoFocus rows="1" onChange={(event) => setMessage(event.target.value)} onInput={() => autoGrow(textAreaRef)} /> */}
                        <textarea ref={textAreaRef} value={message} className="max-h-12 grow bg-light-a dark:bg-dark-a rounded-2xl outline-none resize-none overflow-y-auto px-3 py-2" placeholder={showPlaceholder ? "Aa" : ""} spellCheck="false" autoFocus rows="1" onChange={handleChange} />
                        <button type="submit" className="rounded-md outline-none">
                            <Send className={`w-6 mb-1 ${postIconStyle}`}></Send>
                        </button>
                    </form>
                    <div className="fixed top-16 h-20 w-full custom-max-width lg:max-w-[33vw] flex items-center gap-2 bg-light-c dark:bg-dark-c p-2">
                        <img className="rounded-full w-8 h-8 object-cover" src={recipient.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                        <span className="truncate text-base">{recipient.displayName || recipient.firstName}</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default MessengerChat;
