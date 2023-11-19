const appendVirtualFields = (user, currentUserId) => {
    let status;
    const isFriends = user.friends.some((friend) => friend.friendId.toString() === currentUserId);
    const isPending = user.friendRequests.some((friend) => friend.friendId.toString() === currentUserId);

    if (user.id === currentUserId) {
        status = "self";
    } else if (isFriends) {
        status = "friend";
    } else if (isPending) {
        status = "pending";
    } else {
        status = "notFriend";
    }

    const appendedUser = [user].map((user) => {
        const totalFriends = user.totalFriends;
        return {
            ...user.toJSON(),
            status,
            totalFriends,
        };
    });

    return appendedUser;
};

module.exports = appendVirtualFields;
