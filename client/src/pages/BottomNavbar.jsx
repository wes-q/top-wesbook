import { NavLink } from "react-router-dom";
import ProfileIcon from "../icons/account-circle-profile-google.svg?react";
import FriendsIcon from "../icons/friends-group-google.svg?react";
import HomeIcon from "../icons/home-google.svg?react";
import PlayIcon from "../icons/play-videogame-google.svg?react";
import LeaderboardIcon from "../icons/trophy-google.svg?react";

const BottomNavbar = ({ user }) => {
    const isUserLoaded = user;

    return (
        <div className="flex items-center justify-center">
            <NavLink className="flex justify-center relative grow py-3 rounded-t-lg" to="/">
                <HomeIcon className="fill-current" />
            </NavLink>
            <NavLink className="flex justify-center relative grow py-3 rounded-t-lg" to={"/friends-page/suggestions"} style={{ textDecoration: "none" }}>
                <FriendsIcon className="fill-current" />
            </NavLink>
            <NavLink className="group relative flex grow items-center justify-center px-8 py-2 hover:bg-light-c dark:hover:bg-dark-a transition-colors rounded-t-lg" to="/messenger">
                <MessengerIcon className="fill-current w-6 h-6" />
                <div className="absolute top-14 left-0 right-0 mx-auto w-fit invisible group-hover:visible delay-200 opacity-80 bg-white rounded-md text-sm px-2 py-1 text-black shadow-md">Messenger</div>
            </NavLink>
            {isUserLoaded && (
                <>
                    <NavLink className="flex justify-center relative grow py-3 rounded-t-lg" to={`/profile/${user.id}`}>
                        <ProfileIcon className="fill-current" />
                    </NavLink>
                </>
            )}
            <NavLink className="flex justify-center relative grow py-3 rounded-t-lg" to="/play">
                <PlayIcon className="fill-current" />
            </NavLink>
        </div>
    );
};

export default BottomNavbar;
