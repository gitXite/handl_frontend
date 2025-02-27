import api from '@utils/api';


// Register a user, send user data to the backend to store on the database
export const registerUser = async (userData) => {
    try {
        const result = await api.post('/api/auth/register', userData);
        return result;
    } catch (error) {
        throw error;
    }
};


// Login the user, send credentials to the backend to compare with the database
export const loginUser = async (credentials) => {
    try {
        const result = await api.post('/api/auth/login', credentials);
        return result;
    } catch (error) {
        throw error;
    }
};
