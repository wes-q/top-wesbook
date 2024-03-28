// import React from "react";
// import Friends from "./Friends";
// import FriendsPageTab from "./FriendsLayout";
// import { useEffect, useState } from "react";
// import getUserHeaders from "../helpers/getUserHeaders";
// import axios from "axios";

// const FriendsPage = ({ currentUser }) => {
//     const [friends, setFriends] = useState([]);
//     const [eligibleFriends, setEligibleFriends] = useState([]);
//     const [pendingFriends, setPendingFriends] = useState([]);
//     const [incomingFriends, setIncomingFriends] = useState([]);

//     const headers = getUserHeaders();

//     useEffect(() => {
//         getUsersFriends();
//         getEligibleFriends();
//     }, []);

//     const getUsersFriends = async () => {
//         const url = `${import.meta.env.VITE_SERVER_URL}/api/users/${currentUser.id}/friends`;
//         const friends = await axios.get(url, { headers });
//         setUsersFriends(friends.data);
//     };

//     const getEligibleFriends = async () => {
//         const url = `${import.meta.env.VITE_SERVER_URL}/api/users/eligible-friends`;
//         const eligibleFriends = await axios.get(url, { headers });
//         setEligibleFriends(eligibleFriends.data);
//     };

//     return (
//         <>
//             <div>FriendsPage</div>
//             <FriendsPageTab />
//             <Friends usersFriends={usersFriends} />
//             <EligibleFriends />
//         </>
//     );
// };

// export default FriendsPage;
