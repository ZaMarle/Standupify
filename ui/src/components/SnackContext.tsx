import { Alert, Fade, Slide, SlideProps, Snackbar } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { createContext, ReactNode, useContext } from 'react';

export interface ISnackContext {
    send: (message: SnackMessages) => void;
}

const SnackContext = createContext<ISnackContext | undefined>(undefined);

export const useSnack = () => {
    const context = useContext(SnackContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface ISnackProviderProps {
    children: ReactNode;
}

export const SnackProvider = ({ children }: ISnackProviderProps) => {
    const [snackbar, setSnackbar] = React.useState<{
        open: boolean;
        message: SnackMessages;
        Transition: React.ComponentType<
            TransitionProps & {
                children: React.ReactElement<any, any>;
            }
        >;
    }>({
        open: false,
        message: SnackMessages.Empty,
        Transition: Fade,
    });

    const send = (message: SnackMessages) => {
        console.log(message);
        setSnackbar({
            Transition: SlideTransition,
            message: message,
            open: true,
        });
    };

    const handleClose = () => {
        setSnackbar({
            Transition: SlideTransition,
            message: SnackMessages.Empty,
            open: false,
        });
    };

    function SlideTransition(props: SlideProps) {
        return <Slide {...props} direction="up" />;
    }

    return (
        <SnackContext.Provider value={{ send }}>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
            {children}
        </SnackContext.Provider>
    );
};

export enum SnackMessages {
    Empty = '',
    BadConnection = 'Something went wrong while processing your request. Please check your connection and try again.',
}
