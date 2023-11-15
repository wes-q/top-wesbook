import Posts from "./Posts";
import Users from "./Users";

const Newsfeed = ({ currentUser }) => {
    return (
        <div>
            <div className="p-3">
                <Users user={currentUser} />
                <Posts userToDisplay={currentUser} currentUser={currentUser} postsOf="friends" />
            </div>
        </div>
    );
};

export default Newsfeed;
