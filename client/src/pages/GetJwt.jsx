import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GetJwt = () => {
    const navigate = useNavigate();

    const getJwt = async () => {
        try {
            const token = await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/getjwt`);
            console.log(token);
            window.localStorage.setItem("loggedUserToken", token.data);
            navigate("/");
            navigate(0);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getJwt();
    }, []);
};

export default GetJwt;
