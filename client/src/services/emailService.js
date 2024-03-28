import axios from "axios";
const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/send-verification-email`;
// const baseUrl = `/api/send-verification-email`; // Use this relative backend URL if backend is accessible using the frontend URL via proxy

const sendEmail = async (headers) => {
    try {
        const response = await axios.get(baseUrl, headers);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default { sendEmail };
