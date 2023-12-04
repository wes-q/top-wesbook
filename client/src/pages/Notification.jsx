import { motion, AnimatePresence } from "framer-motion";

const Notification = ({ notification, setNotification }) => {
    const typeToColorClass = {
        success: "text-green-400",
        error: "text-red-500",
        warning: "text-amber-500",
        info: "text-cyan-500",
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
                <motion.div className="fixed right-3 top-24 z-50" key="notification" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} exit={{ opacity: 0, x: 30 }}>
                    <div className={`flex justify-between items-center w-full px-3 py-2 text-left rounded-md bg-light-b dark:bg-dark-b ${colorClass} mb-4 whitespace-pre-line shadow-md border border-neutral`}>
                        <span className="sm:text-sm text-xs whitespace-pre-wrap">{notification.message}</span>
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
