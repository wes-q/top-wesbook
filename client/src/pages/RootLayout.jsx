import { useState, useRef, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Footer from "./Footer";
import Notification from "./Notification";
import DropDown from "./DropDown";
import WesbookLogo from "../icons/wesbooklogo.svg?react";
import Hamburger from "../icons/hamburger.svg?react";
import { motion, AnimatePresence } from "framer-motion";
import X from "../icons/x.svg?react";
import Timer from "./Timer";

export default function RootLayout({ notification, user, setNotification, showFooter, showStartTimer, setSeconds, seconds }) {
    // const isUserLoaded = user && user.firstName && user.profilePhoto;
    const isUserLoaded = user;
    const [isExpanded, setIsExpanded] = useState(false);

    // const dropdownRef = useRef(null);
    // const dropdownRef2 = useRef(null);

    // // Collapses the popup when user clicks outside
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //             // Close the navbar dropdown
    //             // setIsExpanded(false);
    //             dropdownRef.current.open = false;
    //             dropdownRef2.current.open = false;
    //         }
    //     };

    //     document.addEventListener("click", handleClickOutside);

    //     return () => {
    //         document.removeEventListener("click", handleClickOutside);
    //     };
    // }, []);

    return (
        <div className="flex flex-col min-h-screen h-full bg-slate-600 text-white text-sm sm:text-base font-nunito">
            <header>
                <nav className="relative w-full sm:justify-between sm:items-center p-3 sm:p-6 bg-gray-800 specific text-base sm:text-lg">
                    <div className={`flex items-center justify-between ${isExpanded && "mb-0"}`}>
                        <a className="flex items-center" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
                            <WesbookLogo className="w-10 h-auto select-none" />
                            <div className="-skew-y-6 select-none hidden sm:block">
                                {/* <span className="font-handlee text-4xl font-extrabold italic text-cyan-400">Wes</span>
                                <span className="font-handlee text-4xl font-extrabold italic">book</span> */}
                            </div>
                        </a>
                        {showStartTimer && <Timer className="h-auto max-h-10" setSeconds={setSeconds} seconds={seconds}></Timer>}
                        <div className="hidden sm:block">
                            {isUserLoaded && (
                                <NavLink className="text-cyan-400 bg-gray-800 rounded-md px-4 py-1 whitespace-nowrap" to={`/profile/${user.id}`}>
                                    My Profile
                                </NavLink>
                            )}
                            <NavLink className="text-cyan-400 bg-gray-800 rounded-md px-4 py-1 whitespace-nowrap" to="/">
                                Newsfeed
                            </NavLink>
                            {/* <NavLink className="text-cyan-400 bg-gray-800 rounded-md px-4 py-1 whitespace-nowrap" to={`/profile/${user.id}`}>
                                Profile Page
                            </NavLink> */}
                            <NavLink className="text-cyan-400 bg-gray-800 rounded-md px-4 py-1 whitespace-nowrap" to="/update-profile">
                                Manage Account
                            </NavLink>
                            <NavLink className="text-cyan-400 bg-gray-800 rounded-md px-4 py-1" to="/play">
                                Play
                            </NavLink>
                            <NavLink className="text-cyan-400 bg-gray-800 rounded-md px-4 py-1 whitespace-nowrap" to="/leaderboard">
                                Leaderboard
                            </NavLink>
                            {/* <NavLink className="text-cyan-400 bg-gray-800 hover:underline rounded-md px-4 py-1" to="/about">
                                About
                            </NavLink> */}
                        </div>

                        <div className="flex items-center gap-6">
                            {isUserLoaded ? (
                                <DropDown user={user} setNotification={setNotification}></DropDown>
                            ) : (
                                <NavLink className="text-cyan-400 bg-gray-800 rounded-md px-4 py-1 font-nunito" to="/login">
                                    Login
                                </NavLink>
                            )}
                            <button className="sm:hidden" onClick={() => setIsExpanded(!isExpanded)}>
                                {isExpanded ? <X className="w-6 h-auto fill-current" /> : <Hamburger className="w-6 h-auto fill-current" />}
                            </button>
                        </div>
                    </div>
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                // ref={dropdownRef}
                                className="absolute top-16 left-0 z-40 grid grid-cols-2 sm:hidden sm:flex-row sm:justify-center sm:items-center sm:gap-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }} //
                                transition={{ duration: 0.6 }}
                            >
                                {/* {isUserLoaded && (
                                    <NavLink className="text-cyan-400 bg-gray-800 rounded-md px-4 py-1 whitespace-nowrap" to={`/profile/${user.id}`}>
                                        My Profile
                                    </NavLink>
                                )}
                                <NavLink className="text-cyan-400 bg-gray-800 rounded-md px-4 py-1 whitespace-nowrap" to="/">
                                    Newsfeed
                                </NavLink>
                                <NavLink className="text-cyan-400 bg-gray-800 rounded-md px-4 py-1" to="/play">
                                    Play
                                </NavLink>
                                <NavLink className="text-cyan-400 bg-gray-800 rounded-md px-4 py-1 whitespace-nowrap" to="/leaderboard">
                                    Leaderboard
                                </NavLink> */}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                // ref={dropdownRef2}
                                className="absolute z-10 grid grid-cols-2 left-0 top-16 w-full h-auto bg-gray-800 p-3"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }} //
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                {isUserLoaded && (
                                    <NavLink className="flex items-center text-cyan-400 rounded-md px-4 whitespace-nowrap h-8 w-full text-sm" to={`/profile/${user.id}`} style={{ textDecoration: "none" }}>
                                        My Profile
                                    </NavLink>
                                )}
                                <NavLink className="flex items-center text-cyan-400 rounded-md px-4 whitespace-nowrap h-8 w-full text-sm" to="/" style={{ textDecoration: "none" }}>
                                    Newsfeed
                                </NavLink>
                                <NavLink className="flex items-center text-cyan-400 rounded-md px-4 whitespace-nowrap h-8 w-full text-sm" to="/play" style={{ textDecoration: "none" }}>
                                    Play
                                </NavLink>
                                <NavLink className="flex items-center text-cyan-400 rounded-md px-4 whitespace-nowrap h-8 w-full text-sm" to="/leaderboard" style={{ textDecoration: "none" }}>
                                    Leaderboard
                                </NavLink>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </header>

            <main className="relative h-full grow overflow-hidden">
                <Notification notification={notification} setNotification={setNotification} />
                <Outlet />
            </main>

            {showFooter && (
                <footer>
                    <Footer />
                </footer>
            )}
        </div>
    );
}
