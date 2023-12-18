import axios from "axios";
const baseUrl = "/api/login-local";

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
