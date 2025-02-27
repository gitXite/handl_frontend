import axios from '@axiosConfig';


// Generic asynchronous methods for HTTP requests using axios
const api = {
    get: async (endpoint, config = {}) => {
        try {
            const response = await axios.get(endpoint, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    post: async (endpoint, data, config = {}) => {
        try {
            const response = await axios.post(endpoint, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    put: async (endpoint, data, config = {}) => {
        try {
            const response = await axios.put(endpoint, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    delete: async (endpoint, config = {}) => {
        try {
            const response = await axios.delete(endpoint, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};


export default api;
