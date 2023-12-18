import axios from "axios";
const baseUrl = `/api/send-verification-email`;

const sendEmail = async (headers) => {
    try {
        const response = await axios.get(baseUrl, headers);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default { sendEmail };
