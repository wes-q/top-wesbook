import axios from "axios";
const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/login-local`;
// const baseUrl = `/api/login-local`; // Use this relative backend URL if backend is accessible using the frontend URL via proxy

const login = async (credentials) => {
    try {
        const response = await axios.post(baseUrl, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const loginSuccess = async (headers) => {
    try {
        const response = await axios.get(`${baseUrl}/success`, headers);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default { login, loginSuccess };
