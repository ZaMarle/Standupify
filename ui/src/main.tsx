import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import the theme
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './components/AuthContext.tsx';
import { SnackProvider } from './components/SnackContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </SnackProvider>
        </ThemeProvider>
    </StrictMode>,
);
