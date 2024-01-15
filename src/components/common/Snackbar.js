import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const showSnackbar = (msg) => {
        setMessage(msg);
        setOpen(true);
    };

    const hideSnackbar = () => {
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
            {children}
            <Snackbar open={open} autoHideDuration={1000} onClose={hideSnackbar} message={message} />
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};