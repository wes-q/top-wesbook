import { NavLink, Link } from "react-router-dom";
import DropDown from "./DropDown";
import WesbookLogo from "../icons/wesbooklogo.svg?react";
import { motion, AnimatePresence } from "framer-motion";
import Timer from "./Timer";
import ProfileIcon from "../icons/account-circle-profile-google.svg?react";
import FriendsIcon from "../icons/friends-group-google.svg?react";
import HomeIcon from "../icons/home-google.svg?react";
import PlayIcon from "../icons/play-videogame-google.svg?react";
import LeaderboardIcon from "../icons/trophy-google.svg?react";

const Navbar = ({ user, showStartTimer, setSeconds, seconds, setNotification }) => {
    const isUserLoaded = user;

    function toggleDarkMode() {
        document.documentElement.classList.toggle("dark");
    }

    return (
        <div className="flex justify-between bg-light-b dark:bg-dark-b h-16">
            <Link className="flex items-center py-3 pl-3" to="/">
                <WesbookLogo className="w-10 h-10 select-none" />
                <div className="-skew-y-6 select-none sm:block">
                    <span className="font-handlee text-2xl font-extrabold italic text-primary">Wes</span>
                    <span className="font-handlee text-2xl font-extrabold italic">book</span>
                </div>
            </Link>

            {showStartTimer && <Timer className="h-auto max-h-10" setSeconds={setSeconds} seconds={seconds}></Timer>}

            <div className="hidden sm:flex gap-1 pt-3 sm:w-[573px]">
                <NavLink className="group relative flex grow items-center justify-center px-8 hover:bg-light-c dark:hover:bg-dark-a transition-colors rounded-t-lg" to="/">
                    <HomeIcon className="fill-current" />
                    <div className="absolute top-14 left-0 right-0 mx-auto w-fit invisible group-hover:visible delay-200 opacity-80 bg-white rounded-md text-sm px-2 py-1 text-black shadow-md">Home</div>
                </NavLink>
                {isUserLoaded && (
                    <>
                        <NavLink className="group relative flex grow items-center justify-center px-8 py-2 hover:bg-light-c dark:hover:bg-dark-a transition-colors rounded-t-lg" to={`/profile/${user.id}`}>
                            <ProfileIcon className="fill-current" />
                            <div className="absolute top-14 left-0 right-0 mx-auto w-fit invisible group-hover:visible delay-200 opacity-80 bg-white rounded-md text-sm px-2 py-1 text-black shadow-md">My Profile</div>
                        </NavLink>
                    </>
                )}
                <NavLink className="group relative flex grow items-center justify-center px-8 py-2 hover:bg-light-c dark:hover:bg-dark-a transition-colors rounded-t-lg" to={"/friends-page/suggestions"} style={{ textDecoration: "none" }}>
                    <FriendsIcon className="fill-current" />
                    <div className="absolute top-14 left-0 right-0 mx-auto w-fit invisible group-hover:visible delay-200 opacity-80 bg-white rounded-md text-sm px-2 py-1 text-black shadow-md">Friends</div>
                </NavLink>
                <NavLink className="group relative flex grow items-center justify-center px-8 py-2 hover:bg-light-c dark:hover:bg-dark-a transition-colors rounded-t-lg" to="/play">
                    <PlayIcon className="fill-current" />
                    <div className="absolute top-14 left-0 right-0 mx-auto w-fit invisible group-hover:visible delay-200 opacity-80 bg-white rounded-md text-sm px-2 py-1 text-black shadow-md">Play</div>
                </NavLink>
                <NavLink className="group relative flex grow items-center justify-center px-8 py-2 hover:bg-light-c dark:hover:bg-dark-a transition-colors rounded-t-lg" to="/leaderboard">
                    <LeaderboardIcon className="fill-current" />
                    <div className="absolute top-14 left-0 right-0 mx-auto w-fit invisible group-hover:visible delay-200 opacity-80 bg-white rounded-md text-sm px-2 py-1 text-black shadow-md">Leaderboard</div>
                </NavLink>
            </div>

            <div className="flex items-center justify-end pr-3 w-[144px]">
                <div className="flex">
                    <button onClick={toggleDarkMode} className="flex justify-center items-center sm:justify-start rounded-lg grayscale hover:grayscale-0 transition-all duration-300">
                        <svg className="inline dark:hidden w-6 mx-3" id="lightIcon" aria-hidden="true" focusable="false" data-prefix="fad" data-icon="moon-stars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <g>
                                <path className="text-primaryDark" fill="currentColor" d="M320 32L304 0l-16 32-32 16 32 16 16 32 16-32 32-16zm138.7 149.3L432 128l-26.7 53.3L352 208l53.3 26.7L432 288l26.7-53.3L512 208z"></path>
                                <path className="text-primary" fill="currentColor" d="M332.2 426.4c8.1-1.6 13.9 8 8.6 14.5a191.18 191.18 0 0 1-149 71.1C85.8 512 0 426 0 320c0-120 108.7-210.6 227-188.8 8.2 1.6 10.1 12.6 2.8 16.7a150.3 150.3 0 0 0-76.1 130.8c0 94 85.4 165.4 178.5 147.7z"></path>
                            </g>
                        </svg>
                        <svg className="hidden dark:inline w-6 mx-3" id="darkIcon" aria-hidden="true" focusable="false" data-prefix="fad" data-icon="sunglasses" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <g>
                                <path
                                    className="text-primary"
                                    fill="currentColor"
                                    d="M574.09 280.38L528.75 98.66a87.94 87.94 0 0 0-113.19-62.14l-15.25 5.08a16 16 0 0 0-10.12 20.25L395.25 77a16 16 0 0 0 20.22 10.13l13.19-4.39c10.87-3.63 23-3.57 33.15 1.73a39.59 39.59 0 0 1 20.38 25.81l38.47 153.83a276.7 276.7 0 0 0-81.22-12.47c-34.75 0-74 7-114.85 26.75h-73.18c-40.85-19.75-80.07-26.75-114.85-26.75a276.75 276.75 0 0 0-81.22 12.45l38.47-153.8a39.61 39.61 0 0 1 20.38-25.82c10.15-5.29 22.28-5.34 33.15-1.73l13.16 4.39A16 16 0 0 0 180.75 77l5.06-15.19a16 16 0 0 0-10.12-20.21l-15.25-5.08A87.95 87.95 0 0 0 47.25 98.65L1.91 280.38A75.35 75.35 0 0 0 0 295.86v70.25C0 429 51.59 480 115.19 480h37.12c60.28 0 110.38-45.94 114.88-105.37l2.93-38.63h35.76l2.93 38.63c4.5 59.43 54.6 105.37 114.88 105.37h37.12C524.41 480 576 429 576 366.13v-70.25a62.67 62.67 0 0 0-1.91-15.5zM203.38 369.8c-2 25.9-24.41 46.2-51.07 46.2h-37.12C87 416 64 393.63 64 366.11v-37.55a217.35 217.35 0 0 1 72.59-12.9 196.51 196.51 0 0 1 69.91 12.9zM512 366.13c0 27.5-23 49.87-51.19 49.87h-37.12c-26.69 0-49.1-20.3-51.07-46.2l-3.12-41.24a196.55 196.55 0 0 1 69.94-12.9A217.41 217.41 0 0 1 512 328.58z"
                                ></path>
                                <path className="text-primaryDark" fill="currentColor" d="M64.19 367.9c0-.61-.19-1.18-.19-1.8 0 27.53 23 49.9 51.19 49.9h37.12c26.66 0 49.1-20.3 51.07-46.2l3.12-41.24c-14-5.29-28.31-8.38-42.78-10.42zm404-50l-95.83 47.91.3 4c2 25.9 24.38 46.2 51.07 46.2h37.12C489 416 512 393.63 512 366.13v-37.55a227.76 227.76 0 0 0-43.85-10.66z"></path>
                            </g>
                        </svg>
                    </button>

                    {isUserLoaded ? (
                        <DropDown user={user} setNotification={setNotification}></DropDown>
                    ) : (
                        <NavLink className="dark:text-primaryDark bg-light-c dark:bg-dark-c rounded-md px-4 py-1 font-nunito" to="/login">
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
