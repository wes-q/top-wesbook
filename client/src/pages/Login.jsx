import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useField } from "../hooks/";
import loginService from "../services/login";
import FacebookLogo from "../icons/facebooklogo.svg?react";
import GoogleLogo from "../icons/googlelogo.svg?react";
import GithubLogo from "../icons/githublogo.svg?react";

export default function Login({ setNotification, notification }) {
    const [showPassword, setShowPassword] = useState(false);
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const email = useField("email");
    const password = useField("password");
    const navigate = useNavigate();

    const googleAuth = () => {
        // window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self");
        window.open(`/auth/google`, "_self");
    };

    const facebookAuth = () => {
        // window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self");
        // window.open(`/auth/facebook`, "_self");
        // alert("Sorry! Currently not working because facebook login requires business verification :(");
        setNotification({ message: "Sorry! Login via Facebook now requires a business verification :(", type: "warning" });
        setTimeout(() => {
            setNotification(false);
        }, 7000);
    };

    const githubAuth = () => {
        // window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self");
        window.open(`/auth/github`, "_self");
    };

    const handleNextLogin = async () => {
        if (showPassword === false) {
            setShowPassword(true);
        } else {
            // Allow handleLogin to set user token state and to store the token to the browsers local storage
            // Allow handleLogin to store user's token inside 1) state 2) browser's local storage 3) anecdoteService
            try {
                //this validates the password against DB, and creates JWT token
                const token = await loginService.login({ email: email.value, password: password.value });
                // console.log(`LOGIN SERVICE NO ERROR ${token}`);
                window.localStorage.setItem("loggedUserToken", token);
                //to set token for anecdote service,
                // anecdoteService.setToken(user.token)
                setNotification(false);
                navigate("/");
                navigate(0);
            } catch (error) {
                if (error.response.data.error) {
                    const firstError = error.response.data.error;
                    setNotification({ message: firstError, type: "error" });
                    setIsDisabled(false);
                    setTimeout(() => {
                        setNotification(false);
                    }, 5000);
                }
            }
        }
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            handleNextLogin();
            // setShowPassword(true);
        }
    };

    return (
        <section className="w-auto sm:w-[300px] text-slate-600 text-sm font-medium bg-white rounded-lg mx-auto">
            <h1 className="mb-2 text-sm font-medium">Login</h1>
            <button className="flex justify-center items-center w-full text-center bg-white text-lg font-semibold h-12 border border-slate-400 rounded-lg mb-4 hover:shadow-xl hover:scale-105 transition-all" onClick={googleAuth}>
                <div className="flex justify-center items-center mr-2 w-10 h-10 min-w-10 min-h-10">
                    <GoogleLogo />
                </div>
                <span>Google</span>
            </button>

            <button className="flex justify-center items-center w-full text-center bg-white text-lg font-semibold h-12 border border-slate-400 rounded-lg mb-4 hover:shadow-xl hover:scale-105 transition-all" onClick={facebookAuth}>
                <div className="flex justify-center items-center mr-2 w-10 h-10 min-w-10 min-h-10">
                    <FacebookLogo />
                </div>
                <span>Facebook</span>
            </button>

            <button className="flex justify-center items-center w-full text-center bg-white text-lg font-semibold h-12 border border-slate-400 rounded-lg mb-4 hover:shadow-xl hover:scale-105 transition-all" onClick={githubAuth}>
                <div className="flex justify-center items-center mr-2 w-10 h-10 min-w-10 min-h-10">
                    <GithubLogo />
                </div>
                <span>Github</span>
            </button>

            <hr className="mb-2" />

            <div className="h-52">
                <label className="block">
                    <span>Email</span>
                    <div className="relative">
                        <input {...email} reset="" name="email" className="mt-1 mb-2 px-3 py-2 bg-white border shadow-sm border-slate-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-cyan-400 block w-full rounded-md sm:text-sm focus:ring-1 disabled:bg-slate-300" placeholder="you@example.com" autoFocus disabled={showPassword ? true : false} spellCheck="false" onKeyDown={handleEnterPress} />
                        {showPassword && (
                            <button className="absolute z-10 bg-slate-300 pl-2 right-3 top-2 text-sm font-normal text-cyan-600 hover:text-cyan-500" onClick={() => setShowPassword(false)}>
                                Change
                            </button>
                        )}
                    </div>
                </label>

                {showPassword && (
                    <label className="block">
                        <span className="block text-sm font-medium">Password</span>
                        <input {...password} reset="" name="password" className="mt-1 mb-2 px-3 py-2 bg-white border shadow-sm border-slate-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-cyan-400 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="You@1234" autoFocus onKeyDown={handleEnterPress} />
                    </label>
                )}

                <button className="w-1/2 sm:w-full bg-cyan-400 hover:ring-cyan-500 hover:ring-1 hover:shadow-md text-white font-bold py-2 px-4 rounded focus:outline-none mr-2 transition-all" type="button" onClick={() => handleNextLogin()}>
                    {showPassword ? "Login" : "Next"}
                </button>

                <p className="mt-4">
                    Don't have an account?{" "}
                    <Link className="underline hover:text-cyan-400 transition-colors" to="/signup">
                        Sign up
                    </Link>
                </p>
            </div>
        </section>
    );
}
