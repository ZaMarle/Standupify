import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark', // Set the mode to dark for a darker theme
        primary: {
            main: '#10A37F', // Greenish primary color used in the ChatGPT site
        },
        secondary: {
            main: '#6B7280', // Secondary color for accents
        },
        background: {
            default: '#121212', // Dark background color
            paper: '#1E1E1E', // Lighter dark color for paper components (like cards)
        },
        text: {
            primary: '#E4E4E7', // Light text on dark background
            secondary: '#A0A0A0', // Lighter secondary text color
        },
    },
    typography: {
        fontFamily: "'Inter', sans-serif", // The font used on ChatGPT site
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 700,
        },
        h3: {
            fontWeight: 700,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#121212', // Force the background color globally
                    color: '#E4E4E7',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#121212',
                    boxShadow: 'none',
                    backgroundImage:
                        'linear-gradient(rgba(255, 255, 255, 0.092), rgba(255, 255, 255, 0.092))', // Add gradient here
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '8px 16px',
                    fontWeight: 600,
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&:focus': {
                        outline: 'none',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#121212',
                    boxShadow: 'none',
                },
            },
        },
    },
});

export default theme;
