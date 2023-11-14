import Posts from "./Posts";
import Users from "./Users";

const Newsfeed = ({ user }) => {
    return (
        <div>
            <div className="p-3">
                <Users user={user} />
                <Posts currentUser={user} postsOf="friends" />
            </div>
        </div>
    );
};

export default Newsfeed;
