import Posts from "./Posts";
import FriendsC from "./FriendsC";

const Newsfeed = ({ currentUser, setNotification }) => {
    return (
        <div className="relative">
            <div className="flex gap-4 justify-center max-w-max mx-auto relative p-3">
                <div className="w-72"></div>
                <Posts userToDisplay={currentUser} currentUser={currentUser} postsOf="friends" setNotification={setNotification} />
                <div className="">
                    <FriendsC currentUser={currentUser} />
                </div>
            </div>
        </div>
    );
};

export default Newsfeed;
