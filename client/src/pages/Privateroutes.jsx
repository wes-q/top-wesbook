import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ user, isLoadingUser }) => {
    // Navigate only after finishing asynchronous fetching of user and there is no user fetched
    return isLoadingUser ? <p>Loading...</p> : user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
