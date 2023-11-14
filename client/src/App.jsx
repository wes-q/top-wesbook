import { useState, useEffect } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import RootLayout from "./pages/RootLayout";
import SignupForm from "./pages/SignupForm";
import Login from "./pages/Login";
import VerificationSuccessful from "./pages/VerificationSuccessful";
import VerificationNothing from "./pages/VerificationNothing";
import UpdateProfile from "./pages/UpdateProfile";
import About from "./pages/About";
import Game from "./pages/Game";
import LeaderboardPage from "./pages/LeaderboardPage";
import PrivateRoutes from "./pages/Privateroutes";
import Users from "./pages/Users";
import Posts from "./pages/Posts";

import loginService from "./services/login";
import PlayPage from "./pages/PlayPage";
import GetJwt from "./pages/GetJwt";
import ProfilePage from "./pages/ProfilePage";
import Newsfeed from "./pages/Newsfeed";

function App() {
    const [notification, setNotification] = useState(null);
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState("");
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [showFooter, setShowFooter] = useState(true);
    const [showStartTimer, setShowStartTimer] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [game, setGame] = useState(null);

    useEffect(() => {
        getUserLocal();
    }, []);

    const getUserLocal = async () => {
        const loggedUserToken = window.localStorage.getItem("loggedUserToken");
        if (loggedUserToken) {
            try {
                const headerConfig = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${loggedUserToken}`,
                    },
                };
                const data = await loginService.loginSuccess(headerConfig);
                setUser(data.user);
                setNotification({ message: "Login successful!", type: "success" });
                setTimeout(() => {
                    setNotification(null);
                }, 1000);
            } catch (error) {
                console.log("Automatic relogin: No user session found.");
                // Make sure backed always responds with jwt expired for expired tokens
                if (error.response.data.error === "jwt expired") {
                    // Handle the removal of the expired token in the browsers local storage
                    window.localStorage.removeItem("loggedUserToken");
                    setNotification({ message: "Session expired for security purposes, please login again.", type: "warning" });
                    setTimeout(() => {
                        setNotification(null);
                    }, 10000);
                }
            } finally {
                setIsLoadingUser(false);
            }
        } else {
            setIsLoadingUser(false); // Set loading to finished if there is no logged user session
        }
    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<RootLayout notification={notification} setNotification={setNotification} user={user} showFooter={showFooter} showStartTimer={showStartTimer} setSeconds={setSeconds} seconds={seconds} />}>
                    <Route element={<PrivateRoutes user={user} isLoadingUser={isLoadingUser} />}>
                        <Route index element={<Newsfeed user={user} />} />
                        <Route path="play" element={<PlayPage setGame={setGame} />} />
                        <Route path="leaderboard" element={<LeaderboardPage />} />
                        <Route path="users" element={<Users user={user} />} />
                        <Route path="game" element={<Game game={game} setShowFooter={setShowFooter} setShowStartTimer={setShowStartTimer} seconds={seconds} setSeconds={setSeconds} />} />
                        <Route path="about" element={<About />} />
                        <Route path="verification-successful" element={<VerificationSuccessful />} />
                        <Route path="verification-nothing" element={<VerificationNothing />} />
                        <Route path="update-profile" element={<UpdateProfile user={user} setUser={setUser} setNotification={setNotification} />} />
                        <Route path="profile/:id" element={<ProfilePage currentUser={user} setNotification={setNotification} />} />
                    </Route>

                    <Route path="signup" element={<SignupForm setNotification={setNotification} />} />
                    <Route path="getjwt" element={<GetJwt />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="login" element={<Login setNotification={setNotification} setUserToken={setUserToken} />} />
            </>
        )
    );

    return <RouterProvider router={router} />;
}

export default App;
