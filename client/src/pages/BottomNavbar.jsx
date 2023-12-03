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
            {isUserLoaded && (
                <>
                    <NavLink className="flex justify-center relative grow py-3 rounded-t-lg" to={`/profile/${user.id}`}>
                        <ProfileIcon className="fill-current" />
                    </NavLink>
                </>
            )}
            <NavLink className="flex justify-center relative grow py-3 rounded-t-lg" to={"/friends-page/suggestions"} style={{ textDecoration: "none" }}>
                <FriendsIcon className="fill-current" />
            </NavLink>
            <NavLink className="flex justify-center relative grow py-3 rounded-t-lg" to="/play">
                <PlayIcon className="fill-current" />
            </NavLink>
            <NavLink className="flex justify-center relative grow py-3 rounded-t-lg" to="/leaderboard">
                <LeaderboardIcon className="fill-current" />
            </NavLink>
        </div>
    );
};

export default BottomNavbar;
