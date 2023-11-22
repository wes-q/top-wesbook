import React from "react";
import Users from "./Users";

const FriendsPage = ({ currentUser }) => {
    return (
        <>
            <Users user={currentUser} />
            <div>FriendsPage</div>
        </>
    );
};

export default FriendsPage;
