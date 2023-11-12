import Posts from "./Posts";
import Users from "./Users";

const Newsfeed = ({ user }) => {
    return (
        <div>
            <Users user={user} />
            <Posts currentUser={user} postsOf="friends" />
        </div>
    );
};

export default Newsfeed;
