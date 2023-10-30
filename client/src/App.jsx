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

function App() {
    const [notification, setNotification] = useState(null);
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState("");
    const [showFooter, setShowFooter] = useState(true);
    const [showStartTimer, setShowStartTimer] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [game, setGame] = useState(null);

    useEffect(() => {
        // const getUserOauth = async () => {
        //     // console.log("USEEFFECT OAUTH");
        //     try {
        //         // const url = `${import.meta.env.VITE_SERVER_URL}/auth/login/success`;
        //         const { data } = await axios.get("/auth/login/success", { withCredentials: true });
        //         console.log(data);
        //         setUser(data);
        //         setNotification({ message: "Login successful!", type: "success" });
        //         setTimeout(() => {
        //             setNotification(null);
        //         }, 1000);
        //     } catch (err) {
        //         // if there is no user found, or if there is duplicate record with another provider it will catch error
        //         // console.log(err);

        //         if (err.response.data.message) {
        //             // if (err.response.data.message && Array.isArray(err.response.data.message) && err.response.data.message.length > 0) {
        //             setNotification({ message: err.response.data.message[0], type: "error" });
        //             setTimeout(() => {
        //                 setNotification(null);
        //             }, 7000);
        //         } else {
        //             console.log("Automatic relogin: No user session found.");

        //             // setNotification({ message: "Hello! Login to gain complete access", type: "info" });
        //         }
        //     }
        // };

        // if (loggedUserToken) {
        getUserLocal();
        // } else {
        // getUserOauth();
        // }
    }, []);

    //change function name to auto relogin
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
                    console.log("CATCH JWT EXPIRED ");
                    // Handle the removal of the expired token in the browsers local storage
                    window.localStorage.removeItem("loggedUserToken");
                    setNotification({ message: "Session expired for security purposes, please login again.", type: "warning" });
                    setTimeout(() => {
                        setNotification(null);
                    }, 10000);
                }
                // next(error);
            }
        }
    };

    // Create a higher-order component (HOC) for protecting routes
    function ProtectedRoute({ element, ...rest }) {
        // Replace this with your actual authentication check
        const isAuthenticated = /* Your authentication check logic */ false;

        if (!isAuthenticated) {
            // Redirect unauthenticated users to the login page
            return <Navigate to="/login" />;
        }

        // Render the protected route if the user is authenticated
        return <Route {...rest} element={element} />;
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<RootLayout notification={notification} setNotification={setNotification} user={user} showFooter={showFooter} showStartTimer={showStartTimer} setSeconds={setSeconds} seconds={seconds} />}>
                    <Route element={<PrivateRoutes />}>
                        <Route index element={<PlayPage setGame={setGame} />} />
                        <Route element={<LeaderboardPage />} path="leaderboard" />
                        <Route path="users" element={<Users user={user} />} />
                        <Route path="posts" element={<Posts />} />
                        <Route path="game" element={<Game game={game} setShowFooter={setShowFooter} setShowStartTimer={setShowStartTimer} seconds={seconds} setSeconds={setSeconds} />} />
                        <Route path="about" element={<About />} />
                        <Route path="verification-successful" element={<VerificationSuccessful />} />
                        <Route path="verification-nothing" element={<VerificationNothing />} />
                        <Route path="update-profile" element={<UpdateProfile user={user} setUser={setUser} setNotification={setNotification} />} />
                    </Route>

                    <Route path="login" element={<Login setNotification={setNotification} setUserToken={setUserToken} />} />
                    <Route path="signup" element={<SignupForm setNotification={setNotification} />} />
                    <Route path="getjwt" element={<GetJwt />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </>
        )
    );

    return <RouterProvider router={router} />;
}

export default App;
