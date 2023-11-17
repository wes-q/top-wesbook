import Posts from "./Posts";
import Users from "./Users";

const Newsfeed = ({ currentUser, setNotification }) => {
    return (
        <div>
            <div className="p-3">
                <Users user={currentUser} />
                <Posts userToDisplay={currentUser} currentUser={currentUser} postsOf="friends" setNotification={setNotification} />
            </div>
        </div>
    );
};

export default Newsfeed;
