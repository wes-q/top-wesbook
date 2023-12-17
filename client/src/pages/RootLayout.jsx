import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Notification from "./Notification";
import Navbar from "./Navbar";
import BottomNavbar from "./BottomNavbar";
import MessengerPopup from "./MessengerPopup";

export default function RootLayout({ notification, user, setNotification, showFooter, showStartTimer, setSeconds, seconds, chatRecipient, showChat, setShowChat, newChats }) {
    return (
        <div className="flex flex-col min-h-screen h-full bg-light-c dark:bg-dark-c text-sm sm:text-base font-nunito">
            <header>
                <nav className="fixed top-0 z-30 w-full md:justify-between md:items-center navbar text-base md:text-lg h-auto shadow-md">
                    <Navbar user={user} showStartTimer={showStartTimer} setSeconds={setSeconds} seconds={seconds} setNotification={setNotification} newChats={newChats} />
                </nav>
            </header>

            <main className="relative grow mt-16 mb-16 md:mb-4">
                <Notification notification={notification} setNotification={setNotification} />
                <Outlet />
            </main>

            {showFooter && (
                <footer className="hidden md:block">
                    <Footer />
                </footer>
            )}

            {showChat && (
                <div className="fixed bottom-0 right-20 z-30">
                    <MessengerPopup currentUser={user} chatRecipient={chatRecipient} setShowChat={setShowChat} />
                </div>
            )}

            <div className="md:hidden fixed bottom-0 z-40 w-full bg-light-b dark:bg-dark-b navbar">
                <BottomNavbar user={user} />
            </div>
        </div>
    );
}
