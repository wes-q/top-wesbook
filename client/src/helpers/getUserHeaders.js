const getUserHeaders = () => {
    const loggedUserToken = window.localStorage.getItem("loggedUserToken");

    if (loggedUserToken) {
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedUserToken}`,
        };
    }

    // Return headers without Authorization if there's no token
    return {
        "Content-Type": "application/json",
    };
};

export default getUserHeaders;
