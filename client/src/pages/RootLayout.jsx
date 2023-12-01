import { useState, useRef, useEffect } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import Footer from "./Footer";
import Notification from "./Notification";
import DropDown from "./DropDown";
import WesbookLogo from "../icons/wesbooklogo.svg?react";
import Hamburger from "../icons/hamburger.svg?react";
import { motion, AnimatePresence } from "framer-motion";
import X from "../icons/x.svg?react";
import Timer from "./Timer";
import ProfileIcon from "../icons/account-circle-profile-google.svg?react";
import FriendsIcon from "../icons/friends-group-google.svg?react";
import HomeIcon from "../icons/home-google.svg?react";
import PlayIcon from "../icons/play-videogame-google.svg?react";
import LeaderboardIcon from "../icons/trophy-google.svg?react";

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
        <div className="flex flex-col min-h-screen h-full bg-slate-800 text-white text-sm sm:text-base font-nunito">
            <header>
                <nav className="fixed top-0 z-30 w-full sm:justify-between sm:items-center p-3 bg-slate-700 navbar text-base sm:text-lg">
                    <div className={`flex items-center justify-between ${isExpanded && "mb-0"}`}>
                        <Link className="flex items-center" to="/">
                            <WesbookLogo className="w-10 h-auto select-none" />
                            <div className="-skew-y-6 select-none sm:block">
                                <span className="font-handlee text-2xl font-extrabold italic text-cyan-400">Wes</span>
                                <span className="font-handlee text-2xl font-extrabold italic">book</span>
                            </div>
                        </Link>
                        {showStartTimer && <Timer className="h-auto max-h-10" setSeconds={setSeconds} seconds={seconds}></Timer>}
                        <div className="hidden sm:flex gap-1">
                            <NavLink className="px-8 py-2 hover:bg-slate-600 transition-colors rounded-t-md" to="/">
                                <HomeIcon className="fill-current" />
                            </NavLink>
                            {isUserLoaded && (
                                <>
                                    <NavLink className="group relative px-8 py-2 hover:bg-slate-600 transition-colors rounded-t-md" to={`/profile/${user.id}`}>
                                        <ProfileIcon className="fill-current" />
                                        <div className="absolute top-14 left-0 invisible group-hover:visible delay-300 opacity-80 bg-white rounded-md text-sm px-2 py-1 text-black shadow-md shadow-black">My Profile</div>
                                    </NavLink>
                                </>
                            )}
                            <NavLink className="group relative px-8 py-2 hover:bg-slate-600 transition-colors rounded-t-md" to={"/friends-page/suggestions"} style={{ textDecoration: "none" }}>
                                <FriendsIcon className="fill-current" />
                                <motion.div
                                    className="absolute top-14 left-0 invisible group-hover:visible opacity-80 bg-white rounded-md text-sm px-2 py-1 text-black shadow-md shadow-black"
                                    initial={{ x: 100 }}
                                    animate={{ x: -100 }}
                                    // exit={{ opacity: 0 }} //
                                    transition={{ duration: 0.6 }}
                                >
                                    Friends
                                </motion.div>
                            </NavLink>
                            <NavLink className="px-8 py-2 hover:bg-slate-600 transition-colors rounded-t-md" to="/play">
                                <PlayIcon className="fill-current" />
                            </NavLink>
                            <NavLink className="px-8 py-2 hover:bg-slate-600 transition-colors rounded-t-md" to="/leaderboard">
                                <LeaderboardIcon className="fill-current" />
                                <motion.div
                                    whileHover={{ scale: 1.2, backgroundColor: "#ff5733", transition: { duration: 0.3 } }}
                                    className="hidden"
                                    style={{
                                        width: 100,
                                        height: 100,
                                        backgroundColor: "#3498db",
                                        borderRadius: 10,
                                        cursor: "pointer",
                                    }}
                                >
                                    Hover me
                                </motion.div>
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
                                    <>
                                        <NavLink className="flex items-center text-cyan-400 rounded-md px-4 whitespace-nowrap h-8 w-full text-sm" to={`/profile/${user.id}`} style={{ textDecoration: "none" }}>
                                            My Profile
                                        </NavLink>
                                        <NavLink className="flex items-center text-cyan-400 rounded-md px-4 whitespace-nowrap h-8 w-full text-sm" to={"/friends-page/suggestions"} style={{ textDecoration: "none" }}>
                                            Friends
                                        </NavLink>
                                    </>
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

            {/* <main className="relative h-full grow overflow-hidden">
                <Notification notification={notification} setNotification={setNotification} />
                <Outlet />
            </main> */}

            <main className="relative h-full grow mt-16">
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
