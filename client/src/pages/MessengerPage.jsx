import { useState } from "react";
import FriendsMessenger from "./FriendsMessenger";

const MessengerPage = ({ currentUser }) => {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [recipient, setRecipient] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (inputValue.trim() !== "") {
        //     setMessages([...messages, inputValue]);
        //     setInputValue("");
        // }
    };

    return (
        <div className="flex">
            <FriendsMessenger currentUser={currentUser} setRecipient={setRecipient} />
            <div>
                <span>Chatting with:</span>
                <img className="w-10 h-10 object-cover rounded-full" src={recipient.profilePhoto} alt="" />
                <span className="truncate">{recipient.displayName || recipient.firstName}</span>
            </div>
            <div className="flex flex-col justify-between dark:bg-dark-b w-full">
                <ul className="list-none m-0 p-0">
                    {messages.map((msg, index) => (
                        <li key={index} className="even:bg-light-c even:dark:bg-dark-a">
                            {msg}
                        </li>
                    ))}
                </ul>
                <form className="bg-opacity-15 p-1 flex h-12 box-border backdrop-filter backdrop-blur-md bg-transparent text-black" onSubmit={handleSubmit}>
                    <input id="input" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} autoComplete="off" className="border-none px-4 py-1 flex-grow rounded-full focus:outline-none" />
                    <button type="submit" className="bg-gray-700 border-none p-2 m-0.25 border-radius-3px outline-none text-white">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MessengerPage;
