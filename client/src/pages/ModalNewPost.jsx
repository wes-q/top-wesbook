import X from "../icons/x.svg?react";
import PhotoIcon from "../icons/add-photo.svg?react";

const ModalNewPost = ({ setShowNewPost }) => {
    const handleClose = () => {
        setShowNewPost(false);
    };
    return (
        <div className="relative z-10 text-black">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
            <div className="fixed inset-0 z-10 flex flex-col items-center justify-center">
                <div className="flex flex-col p-4 text-center justify-center items-center w-80 h-auto overflow-hidden rounded-sm bg-slate-200 shadow-xl">
                    <div className="flex items-center justify-between w-full mb-4">
                        <span className="font-bold">Create new post</span>
                        <X className="cursor-pointer" onClick={handleClose}></X>
                    </div>

                    <hr className="w-full border-t border-gray-300 mb-4" />

                    <textarea className="w-full bg-slate-200 outline-none resize-none mb-4" id="" cols="30" rows="3" placeholder="What's on your mind?" spellCheck="false"></textarea>
                    <hr className="w-full border-t border-gray-300 mb-4" />

                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            <PhotoIcon className="cursor-pointer hover:fill-gray-500 "></PhotoIcon>
                            <span>Add image</span>
                        </div>
                        <button className="px-4 py-1 w-1/2 bg-gray-500 text-white rounded-sm hover:bg-gray-400">Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalNewPost;
