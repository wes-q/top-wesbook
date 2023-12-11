import Posts from "./Posts";
import FriendsC from "./FriendsC";
import Sidebar1 from "./Sidebar1";
import Sidebar2 from "./Sidebar2";
import Footer2 from "./Footer2";

const Newsfeed = ({ currentUser, setNotification }) => {
    return (
        <div className="relative">
            <div className="flex sm:gap-4 justify-center max-w-max mx-auto relative pt-3 px-3">
                <div className="">
                    <div className="hidden sm:flex flex-col w-72 sticky top-20">
                        <Sidebar1 currentUser={currentUser} />
                        <Sidebar2 />
                        <Footer2 />
                    </div>
                </div>

                <Posts userToDisplay={currentUser} currentUser={currentUser} postsOf="friends" setNotification={setNotification} />
                <div className="hidden sm:block">
                    <FriendsC currentUser={currentUser} />
                </div>
            </div>
        </div>
    );
};

export default Newsfeed;
