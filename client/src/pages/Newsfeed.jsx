import Posts from "./Posts";

const Newsfeed = ({ user }) => {
    return (
        <div>
            <Posts currentUser={user} postsOf="friends" />;
        </div>
    );
};

export default Newsfeed;
