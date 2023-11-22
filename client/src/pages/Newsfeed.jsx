import Posts from "./Posts";

const Newsfeed = ({ currentUser, setNotification }) => {
    return (
        <div>
            <div className="p-3">
                <Posts userToDisplay={currentUser} currentUser={currentUser} postsOf="friends" setNotification={setNotification} />
            </div>
        </div>
    );
};

export default Newsfeed;
