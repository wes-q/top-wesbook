import Footer from "./Footer";
import Login from "./Login";
import WesbookLogo from "../icons/wesbooklogo.svg?react";
import Notification from "./Notification";

const LoginPage = ({ setNotification, notification }) => {
    const handleSurprise = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            disableForReducedMotion: true,
        });
    };
    return (
        <div className="flex flex-col justify-between h-screen overflow-hidden">
            <div className="-skew-y-3 z-50">
                <Notification notification={notification} setNotification={setNotification} />
            </div>
            <div className="flex flex-col sm:flex-row justify-start sm:justify-around px-12 sm:p-0">
                <div></div>
                <div></div>
                <div className="flex justify-start sm:justify-end sm:w-[300px]">
                    <div></div>
                    <div className="flex items-center justify-center cursor-cell mb-10" onClick={handleSurprise}>
                        <WesbookLogo className="w-10 h-auto select-none" />
                        <div className="-skew-y-6 select-none sm:block">
                            <span className="font-handlee text-2xl font-extrabold italic text-cyan-400">Wes</span>
                            <span className="font-handlee text-2xl font-extrabold italic text-cyan-950">book</span>
                        </div>
                    </div>
                </div>
                <div className="invisible sm:visible border-l-2"></div>
                <div>
                    <Login setNotification={setNotification} notification={notification} />
                </div>
                <div></div>
                <div></div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
