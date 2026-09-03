import api from './api';

export const authService = {
    login: async (username, password) => {
        const response = await api.post('/login', { username, password });
        return response.data;
    },

    signup: async (username, email, password) => {
        const response = await api.post('/signup', { username, email, password });
        return response.data;
    },

    logout: async () => {
        const response = await api.get('/logout');
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/current_user');
        return response.data;
    }
};

export default authService;
