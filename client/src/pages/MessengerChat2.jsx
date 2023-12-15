import { useState, useRef, useEffect } from "react";
import Send from "../icons/send.svg?react";
import X from "../icons/x-close-google.svg?react";
import getUserHeaders from "../helpers/getUserHeaders";
import axios from "axios";
import noProfilePhoto from "../icons/noprofile.jpg";
import { socket } from "../socket";

const MessengerChat = ({ messagesReceived, room, currentUser, recipient, setShowChat }) => {
    const [message, setMessage] = useState("");
    const [postIconStyle, setPostIconStyle] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    // const [marginPush, setMarginPush] = useState("");
    const textAreaRef = useRef(null);
    const messagesEndRef = useRef(null);

    const handleClose = () => {
        setShowChat(false);
    };

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
        console.log(element.current.style.height);
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
            textAreaRef.current.style.height = "32px"; //Reset the height
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
        // messagesEndRef.current.scrollIntoView(true);
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messagesReceived]);

    // const scrollToBottom = () => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // };

    return (
        // <div className={`flex flex-col bg-light-c dark:bg-dark-c sm:w-[573px] p-3 text-xs mb-[${marginPush}]`}>
        <div className="flex flex-col bg-light-b dark:bg-dark-c shadow-xl rounded-lg">
            <div className="w-full flex justify-between items-center bg-light-a dark:bg-dark-a p-2 rounded-t-lg">
                <div className="flex items-center gap-2">
                    <img className="rounded-full w-7 h-7 object-cover" src={recipient.profilePhoto || noProfilePhoto} alt="profile photo" referrerPolicy="no-referrer" />
                    <span className="truncate text-sm">{recipient.displayName || recipient.firstName}</span>
                </div>
                <div className="rounded-full hover:bg-neutral p-0.5">
                    <X className="cursor-pointer fill-current w-5 h-5" onClick={handleClose}></X>
                </div>
            </div>

            <div className="wrapper">
                <div className="text-xs h-72 content custom-scrollbar px-2 py-2">
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
                                <div className={message.sender === currentUser.id ? "bg-primary dark:bg-primaryDark max-w-[200px] rounded-2xl px-3 py-1 mb-1" : "bg-light-b dark:bg-dark-b max-w-[200px] rounded-2xl px-3 py-1 mb-1"}>
                                    <span className="break-words whitespace-pre-wrap">{message.message}</span>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <form className="w-full flex items-end gap-2 bg-light-c dark:bg-dark-b py-2 px-2 text-xs" onSubmit={handleSubmit}>
                <textarea ref={textAreaRef} value={message} className="w-full bg-light-a dark:bg-dark-a rounded-2xl outline-none resize-none overflow-y-auto px-3 py-2" placeholder={showPlaceholder ? "Aa" : ""} spellCheck="false" autoFocus rows="1" onChange={handleChange} />
                <button type="submit" className="rounded-md outline-none">
                    <Send className={`w-6 mb-1 ${postIconStyle}`}></Send>
                </button>
            </form>
        </div>
    );
};

export default MessengerChat;
