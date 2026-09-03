import api from './api';

export const reviewService = {
    createReview: async (listingId, rating, comment) => {
        const response = await api.post(`/listing/${listingId}/reviews`, {
            review: { rating, comment }
        });
        return response.data;
    },

    deleteReview: async (listingId, reviewId) => {
        const response = await api.delete(`/listing/${listingId}/reviews/${reviewId}`);
        return response.data;
    }
};

export default reviewService;
