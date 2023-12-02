import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Notification from "./Notification";
import Navbar from "./Navbar";

export default function RootLayout({ notification, user, setNotification, showFooter, showStartTimer, setSeconds, seconds }) {
    return (
        <div className="flex flex-col min-h-screen h-full bg-slate-800 text-white text-sm sm:text-base font-nunito">
            <header>
                <nav className="fixed top-0 z-30 w-full sm:justify-between sm:items-center p-3 bg-slate-700 navbar text-base sm:text-lg">
                    <Navbar user={user} showStartTimer={showStartTimer} setSeconds={setSeconds} seconds={seconds} setNotification={setNotification} />
                </nav>
            </header>

            <main className="relative h-full grow mt-16">
                <Notification notification={notification} setNotification={setNotification} />
                <Outlet />
            </main>

            {showFooter && (
                <footer>
                    <Footer />
                </footer>
            )}
        </div>
    );
}
