import { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkLoggedInUser = async () => {
        try {
            const data = await authService.getCurrentUser();
            if (data.success && data.user) {
                setCurrentUser(data.user);
            } else {
                setCurrentUser(null);
            }
        } catch (err) {
            console.error("Error fetching current user:", err);
            setCurrentUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkLoggedInUser();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, loading, checkLoggedInUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
