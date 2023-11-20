import noProfilePhoto from "../icons/noprofile.jpg";

const Friends = ({ usersFriends }) => {
    return (
        <div className="w-full ring-1 bg-slate-200 rounded-md mb-4 text-black p-3">
            <div className="text-xl font-extrabold">Friends</div>
            <div className="text-base font-bold mb-3">{usersFriends.length} friends</div>
            <div className="grid grid-cols-3 gap-2">
                {usersFriends.map((friend, index) => {
                    return (
                        <div className="flex flex-col gap-1">
                            <img className="w-full aspect-square object-cover rounded-md bg-slate-200" src={friend.profilePhoto || noProfilePhoto} alt="" />
                            <span className="font-semibold break-words">{friend.displayName || friend.firstName + " " + friend.lastName}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Friends;
