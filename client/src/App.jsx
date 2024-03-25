import { useState, useEffect } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import RootLayout from "./pages/RootLayout";
import SignupForm from "./pages/SignupForm";
import LoginPage from "./pages/LoginPage";
import VerificationSuccessful from "./pages/VerificationSuccessful";
import VerificationNothing from "./pages/VerificationNothing";
import UpdateProfile from "./pages/UpdateProfile";
import About from "./pages/About";
import Game from "./pages/Game";
import LeaderboardPage from "./pages/LeaderboardPage";
import MessengerPage from "./pages/MessengerPage";
import PrivateRoutes from "./pages/Privateroutes";
import PlayPage from "./pages/PlayPage";
import GetJwt from "./pages/GetJwt";
import ProfilePage from "./pages/ProfilePage";
import FriendsLayout from "./pages/FriendsLayout";
import Newsfeed from "./pages/Newsfeed";
import loginService from "./services/login";
import getUserHeaders from "./helpers/getUserHeaders";
import Suggestions from "./pages/Suggestions";
import Requests from "./pages/Requests";
import FriendsB from "./pages/FriendsB";
import ChartPage from "./pages/ChartPage";
import setDarkModeOnPreference from "./helpers/setDarkModeOnPreference";
import axios from "axios";

function App() {
    const [notification, setNotification] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);
    const [userToken, setUserToken] = useState("");
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [showFooter, setShowFooter] = useState(true);

    const [game, setGame] = useState(null);
    const [chatRecipient, setChatRecipient] = useState([]);
    const [showChat, setShowChat] = useState(false);

    const [newChats, setNewChats] = useState(0);

    const getNewChats = async () => {
        const url = "/api/chats/count-new-chats";

        // const headers = getUserHeaders();
        // try {
        //     const newChatsCount = await axios.get(url, { headers });
        //     console.log(newChatsCount.data);
        //     setNewChats(newChatsCount.data);
        // } catch (error) {
        //     console.log(error);
        // }
    };

    useEffect(() => {
        setDarkModeOnPreference();
        const timeoutId = getUserLocal();
        getNewChats();
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    const getUserLocal = async () => {
        const headers = getUserHeaders();
        let timeoutId;
        try {
            const data = await loginService.loginSuccess({ headers });
            setCurrentUser(data.user);
            // console.log(currentUser);
            // if (currentUser === false) {
            //     alert();
            // } else {
            //     console.log("navigating to home");
            //     navigate("/");
            // }
            setNotification({ message: "Login successful!", type: "success" });
            timeoutId = setTimeout(() => {
                setNotification(false);
            }, 2000);
        } catch (error) {
            console.log("Automatic relogin: No user session found.");
            // Make sure backed always responds with jwt expired for expired tokens
            if (error.response.data.error === "jwt expired") {
                // Handle the removal of the expired token in the browsers local storage
                window.localStorage.removeItem("loggedUserToken");
                setNotification({ message: "Session expired for security purposes, please login again.", type: "warning" });
                setTimeout(() => {
                    setNotification(false);
                }, 10000);
            }
        } finally {
            setIsLoadingUser(false);
        }
        return timeoutId;
    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<RootLayout notification={notification} setNotification={setNotification} user={currentUser} showFooter={showFooter} chatRecipient={chatRecipient} showChat={showChat} setShowChat={setShowChat} newChats={newChats} />}>
                    <Route element={<PrivateRoutes user={currentUser} isLoadingUser={isLoadingUser} />}>
                        <Route index element={<Newsfeed currentUser={currentUser} setNotification={setNotification} setChatRecipient={setChatRecipient} setShowChat={setShowChat} />} />
                        <Route path="play" element={<PlayPage setGame={setGame} />} />
                        <Route path="leaderboard" element={<LeaderboardPage />} />
                        <Route path="friends-page" element={<FriendsLayout currentUser={currentUser} />}>
                            <Route index element={<Suggestions setChatRecipient={setChatRecipient} setShowChat={setShowChat} />} />
                            <Route path="suggestions" element={<Suggestions setChatRecipient={setChatRecipient} setShowChat={setShowChat} />} />
                            <Route path="requests" element={<Requests setChatRecipient={setChatRecipient} setShowChat={setShowChat} />} />
                            <Route path="friends" element={<FriendsB currentUser={currentUser} setChatRecipient={setChatRecipient} setShowChat={setShowChat} />} />
                        </Route>
                        <Route path="game" element={<Game game={game} setShowFooter={setShowFooter} />} />
                        <Route path="about" element={<About />} />
                        <Route path="verification-successful" element={<VerificationSuccessful />} />
                        <Route path="verification-nothing" element={<VerificationNothing />} />
                        <Route path="update-profile" element={<UpdateProfile user={currentUser} setUser={setCurrentUser} setNotification={setNotification} />} />
                        <Route path="profile/:userId" element={<ProfilePage currentUser={currentUser} setCurrentUser={setCurrentUser} setNotification={setNotification} setChatRecipient={setChatRecipient} setShowChat={setShowChat} />} />
                        <Route path="messenger" element={<MessengerPage currentUser={currentUser} setShowFooter={setShowFooter} setNotification={setNotification} />} />
                        <Route path="chart-page" element={<ChartPage />} />
                    </Route>

                    <Route path="signup" element={<SignupForm setNotification={setNotification} />} />
                    <Route path="getjwt" element={<GetJwt />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="login" element={<LoginPage setNotification={setNotification} notification={notification} />} />
            </>
        )
    );

    return <RouterProvider router={router} />;
}

export default App;
