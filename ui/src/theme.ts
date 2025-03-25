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
            //         styleOverrides: `
            //     input:-webkit-autofill,
            //     input:-webkit-autofill:hover,
            //     input:-webkit-autofill:focus,
            //     input:-webkit-autofill:active {
            //       box-shadow: 0 0 0px 1000px #121212 inset !important;
            //       -webkit-text-fill-color: #E4E4E7 !important;
            //       caret-color: #E4E4E7 !important;
            //       transition: background-color 5000s ease-in-out 0s !important;
            //     }
            //   `,
            styleOverrides: {
                // '@global': {
                //     'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active':
                //         {
                //             boxShadow:
                //                 '0 0 0px 1000px #121212 inset !important',
                //             WebkitTextFillColor: '#E4E4E7 !important',
                //             caretColor: '#E4E4E7 !important',
                //             transition:
                //                 'background-color 5000s ease-in-out 0s !important',
                //         },
                // },
                body: {
                    backgroundColor: '#121212', // Force the background color globally
                    color: '#E4E4E7',
                },
            },
            // },
        },
        // MuiInputBase: {
        //     styleOverrides: {
        //         input: {
        //             '&:-webkit-autofill': {
        //                 WebkitBoxShadow: '0 0 0 100px #121212 inset', // Match background
        //                 WebkitTextFillColor: '#E4E4E7', // Text color to match your theme
        //                 caretColor: '#E4E4E7', // Caret color fix
        //                 borderRadius: 'inherit',
        //             },
        //         },
        //     },
        // },
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
