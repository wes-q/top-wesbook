import { NavLink, Outlet } from "react-router-dom";

const FriendsLayout = () => {
    return (
        <div className="p-3">
            <div className="flex gap-2 specific mb-3 font-semibold">
                <NavLink className="bg-slate-200 p-2 text-black rounded-md cursor-pointer" to="/friends-page/suggestions">
                    Suggestions
                </NavLink>
                <NavLink className="bg-slate-200 p-2 text-black rounded-md cursor-pointer" to="/friends-page/requests">
                    Friend Requests
                </NavLink>
                <NavLink className="bg-slate-200 p-2 text-black rounded-md cursor-pointer" to="/friends-page/friends">
                    Your Friends
                </NavLink>
            </div>
            <Outlet />
        </div>
    );
};

export default FriendsLayout;
