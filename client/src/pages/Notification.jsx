import { motion, AnimatePresence } from "framer-motion";

const Notification = ({ notification, setNotification }) => {
    const typeToColorClass = {
        success: "text-green-400",
        error: "text-red-400",
        warning: "text-amber-400",
        info: "text-cyan-400",
    };

    let colorClass;
    if (notification) {
        colorClass = typeToColorClass[notification.type];
    } else {
        colorClass = "text-gray-400";
    }

    return (
        <AnimatePresence>
            {notification && (
                <motion.div className="fixed right-0 z-50 p-6" key="notification" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} exit={{ opacity: 0, x: 30 }}>
                    <div className={`flex justify-between items-center w-full px-3 py-2 text-left rounded-md bg-gray-800 border-black border ${colorClass} mb-4 whitespace-pre-line shadow-lg`}>
                        <span className="text-xs whitespace-pre-wrap">{notification.message}</span>
                        <button className="font-bold text-xs pl-4" onClick={() => setNotification(false)}>
                            X
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Notification;
