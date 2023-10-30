const ModalNewPost = () => {
    return (
        <div className="relative z-10 text-black">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
            <div className="fixed inset-0 z-10 flex flex-col items-center justify-center">
                <div className="flex flex-col gap-4 p-4 text-center justify-center items-center w-80 h-auto overflow-hidden rounded-sm bg-slate-200 shadow-xl">
                    <div>You finished in seconds!</div>
                </div>
            </div>
        </div>
    );
};

export default ModalNewPost;
