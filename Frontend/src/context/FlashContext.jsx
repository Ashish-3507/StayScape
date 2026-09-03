import { createContext, useState, useContext } from 'react';

const FlashContext = createContext();

export const FlashProvider = ({ children }) => {
    const [flash, setFlash] = useState(null); // { type: 'success' | 'error', message: string }

    const showFlash = (type, message) => {
        setFlash({ type, message });
    };

    const clearFlash = () => {
        setFlash(null);
    };

    return (
        <FlashContext.Provider value={{ flash, showFlash, clearFlash }}>
            {children}
        </FlashContext.Provider>
    );
};

export const useFlash = () => useContext(FlashContext);
