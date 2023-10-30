import { useState } from "react";
import PlusIcon from "../icons/plus.svg?react";
import PlusCircle from "../icons/pluscircle.svg?react";
import Modal from "./ModalNewPost";

const Posts = ({ user }) => {
    const [showNewPost, setShowNewPost] = useState(false);

    const handleNewPost = () => {
        //Call Modal
        setShowNewPost(true);
    };

    return (
        <>
            {showNewPost && <Modal setShowNewPost={setShowNewPost} user={user} />}

            <div className="flex flex-col p-6 text-black text-sm">
                <div className="flex items-center mx-auto w-80 h-16 border ring-1 mb-4 rounded-sm bg-slate-200 p-2 hover:cursor-pointer hover:bg-cyan-400 transition-colors" onClick={handleNewPost}>
                    <PlusCircle className="h-10 w-10 mr-2" />
                    <div className="flex flex-col">
                        <span className="font-bold">Create new post</span>
                        <span>Share a photo or write something.</span>
                    </div>
                </div>

                <div className="flex flex-col mx-auto w-80 border ring-1 mb-4 rounded-sm bg-slate-200 p-2">...</div>
            </div>
        </>
    );
};

export default Posts;
