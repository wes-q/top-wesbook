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

    return (
        <div className="flex justify-between">
            <Link className="flex items-center py-3 pl-3" to="/">
                <WesbookLogo className="w-10 h-auto select-none" />
                <div className="-skew-y-6 select-none sm:block">
                    <span className="font-handlee text-2xl font-extrabold italic text-cyan-400">Wes</span>
                    <span className="font-handlee text-2xl font-extrabold italic">book</span>
                </div>
            </Link>
            {showStartTimer && <Timer className="h-auto max-h-10" setSeconds={setSeconds} seconds={seconds}></Timer>}
            <div className="hidden sm:flex gap-1 pt-3">
                <NavLink className="group relative flex items-center px-8 hover:bg-slate-600 transition-colors rounded-t-lg" to="/">
                    <HomeIcon className="fill-current" />
                    <div className="absolute top-14 left-0 right-0 mx-auto w-fit invisible group-hover:visible delay-200 opacity-80 bg-white rounded-md text-sm px-2 py-1 text-black shadow-md shadow-black">Home</div>
                </NavLink>
                {isUserLoaded && (
                    <>
                        <NavLink className="group relative flex items-center px-8 py-2 hover:bg-slate-600 transition-colors rounded-t-lg" to={`/profile/${user.id}`}>
                            <ProfileIcon className="fill-current" />
                            <div className="absolute top-14 left-0 right-0 mx-auto w-fit invisible group-hover:visible delay-200 opacity-80 bg-white rounded-md text-sm px-2 py-1 text-black shadow-md shadow-black">My Profile</div>
                        </NavLink>
                    </>
                )}
                <NavLink className="group relative flex items-center px-8 py-2 hover:bg-slate-600 transition-colors rounded-t-lg" to={"/friends-page/suggestions"} style={{ textDecoration: "none" }}>
                    <FriendsIcon className="fill-current" />
                    <div className="absolute top-14 left-0 right-0 mx-auto w-fit invisible group-hover:visible delay-200 opacity-80 bg-white rounded-md text-sm px-2 py-1 text-black shadow-md shadow-black">Friends</div>
                </NavLink>
                <NavLink className="group relative flex items-center px-8 py-2 hover:bg-slate-600 transition-colors rounded-t-lg" to="/play">
                    <PlayIcon className="fill-current" />
                    <div className="absolute top-14 left-0 right-0 mx-auto w-fit invisible group-hover:visible delay-200 opacity-80 bg-white rounded-md text-sm px-2 py-1 text-black shadow-md shadow-black">Play</div>
                </NavLink>
                <NavLink className="group relative flex items-center px-8 py-2 hover:bg-slate-600 transition-colors rounded-t-lg" to="/leaderboard">
                    <LeaderboardIcon className="fill-current" />
                    <div className="absolute top-14 left-0 right-0 mx-auto w-fit invisible group-hover:visible delay-200 opacity-80 bg-white rounded-md text-sm px-2 py-1 text-black shadow-md shadow-black">Leaderboard</div>
                </NavLink>
            </div>

            <div className="flex items-center gap-6 pr-3">
                {isUserLoaded ? (
                    <DropDown user={user} setNotification={setNotification}></DropDown>
                ) : (
                    <NavLink className="text-cyan-400 bg-gray-800 rounded-md px-4 py-1 font-nunito" to="/login">
                        Login
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default Navbar;
