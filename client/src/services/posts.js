import axios from "axios";
const baseUrl = `/api/posts`;

const getAll = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const create = async (newObject, headerConfig) => {
    try {
        const response = await axios.post(baseUrl, newObject, headerConfig);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// const update = async (id, newObject, customHeaders) => {
//     try {
//         const response = await axios.put(`${baseUrl}/${id}`, newObject, { headers: customHeaders });
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

// const remove = async (id) => {
//     try {
//         const response = await axios.delete(`${baseUrl}/${id}`);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

export default {
    getAll,
    create,
    // update,
    // remove,
};
