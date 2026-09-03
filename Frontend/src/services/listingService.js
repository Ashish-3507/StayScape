import api from './api';

export const listingService = {
    getListings: async () => {
        const response = await api.get('/listing');
        return response.data;
    },

    getListing: async (id) => {
        const response = await api.get(`/listing/${id}`);
        return response.data;
    },

    createListing: async (formData) => {
        const response = await api.post('/listing', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    updateListing: async (id, formData) => {
        const response = await api.put(`/listing/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    deleteListing: async (id) => {
        const response = await api.delete(`/listing/${id}`);
        return response.data;
    }
};

export default listingService;
