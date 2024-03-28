import axios from "axios";
const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/posts`;
// const baseUrl = `/api/posts`; // Use this relative backend URL if backend is accessible using the frontend URL via proxy

const getAll = async (headers) => {
    try {
        const response = await axios.get(baseUrl, headers);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const create = async (newObject, headers) => {
    try {
        const response = await axios.post(baseUrl, newObject, headers);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// const update = async (id, newObject, headerConfig) => {
//     try {
//         const response = await axios.patch(`${baseUrl}/${id}`, newObject, headerConfig);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

const remove = async (id, headers) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`, headers);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default {
    getAll,
    create,
    // update,
    remove,
};
