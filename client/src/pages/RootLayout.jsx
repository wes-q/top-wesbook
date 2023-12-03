import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Notification from "./Notification";
import Navbar from "./Navbar";
import BottomNavbar from "./BottomNavbar";

export default function RootLayout({ notification, user, setNotification, showFooter, showStartTimer, setSeconds, seconds }) {
    return (
        <div className="flex flex-col min-h-screen h-full bg-light-c dark:bg-dark-c text-sm sm:text-base font-nunito">
            <header>
                <nav className="fixed top-0 z-30 w-full sm:justify-between sm:items-center navbar text-base sm:text-lg h-auto shadow-md">
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

            <div className="sm:hidden fixed bottom-0 z-30 w-full bg-light-b dark:bg-dark-b navbar">
                <BottomNavbar user={user} />
            </div>
        </div>
    );
}
