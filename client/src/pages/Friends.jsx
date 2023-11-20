import noProfilePhoto from "../icons/noprofile.jpg";
import { Link } from "react-router-dom";

const Friends = ({ usersFriends }) => {
    return (
        <div className="w-full ring-1 bg-slate-200 rounded-md mb-4 text-black p-3">
            <div className="flex flex-col">
                <div className="text-xl font-extrabold">Friends</div>
                <div className="text-base font-bold mb-3 hover:underline">{usersFriends.length} friends</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
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
                            <span className="font-semibold break-words">{friend.displayName || friend.firstName + " " + friend.lastName}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Friends;
