import Posts from "./Posts";
import FriendsC from "./FriendsC";

const Newsfeed = ({ currentUser, setNotification }) => {
    return (
        <div>
            <div className="flex relative justify-center gap-4 p-3">
                <div className="w-52"></div>
                <div className="sm:w-1/3">
                    <Posts userToDisplay={currentUser} currentUser={currentUser} postsOf="friends" setNotification={setNotification} />
                </div>
                <FriendsC currentUser={currentUser} />
            </div>
        </div>
    );
};

export default Newsfeed;
