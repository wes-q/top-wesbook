import noProfilePhoto from "../icons/noprofile.jpg";
import { Link } from "react-router-dom";

const Friends = ({ usersFriends, userId, currentUser }) => {
    return (
        <div className="bg-light-b dark:bg-dark-b shadow-md rounded-md mb-4 p-3">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <div className="text-xl font-extrabold">Friends</div>
                    <div className="text-base font-bold mb-3">{usersFriends.length} friends</div>
                </div>
                {userId === currentUser.id && (
                    <Link to={"/friends-page/friends"}>
                        <div className="text-cyan-500 hover:underline cursor-pointer h-min">See all friends</div>
                    </Link>
                )}
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {usersFriends.map((friend, index) => {
                    return (
                        <div key={index} className="flex flex-col gap-1">
                            <Link to={`/profile/${friend.id}`}>
                                <img
                                    className="w-full aspect-square object-cover rounded-lg bg-slate-200 cursor-pointer"
                                    src={friend.profilePhoto || noProfilePhoto}
                                    alt="profile photo"
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                        e.target.src = noProfilePhoto;
                                    }}
                                />
                            </Link>
                            {/* <span className="font-semibold break-words">{friend.displayName || friend.firstName + " " + friend.lastName}</span> */}
                            {(() => {
                                if (friend.displayName) {
                                    return <span className="font-semibold truncate">{friend.displayName}</span>;
                                } else if (friend.firstName && friend.lastName) {
                                    return <span className="font-semibold truncate">{`${friend.firstName} ${friend.lastName}`}</span>;
                                } else if (friend.firstName) {
                                    return <span className="font-semibold truncate">{friend.firstName}</span>;
                                } else if (friend.lastName) {
                                    return <span className="font-semibold truncate">{friend.lastName}</span>;
                                } else {
                                    return null;
                                }
                            })()}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Friends;
