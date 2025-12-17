'use client';

import { createTheme } from '@mui/material/styles';

// Create custom Material UI theme
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#667eea',
            light: '#8b9ff5',
            dark: '#4c5fd4',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#764ba2',
            light: '#9b6fc9',
            dark: '#5a3880',
            contrastText: '#ffffff',
        },
        accent: {
            main: '#f093fb',
            light: '#f5b3fc',
            dark: '#d66ff0',
        },
        background: {
            default: '#f5f7fa',
            paper: '#ffffff',
        },
        text: {
            primary: '#2d3748',
            secondary: '#718096',
        },
        error: {
            main: '#e74c3c',
        },
        success: {
            main: '#48bb78',
        },
    },
    typography: {
        fontFamily: [
            'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            fontSize: '2.5rem',
            letterSpacing: '-0.02em',
        },
        h2: {
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: '2rem',
            letterSpacing: '-0.01em',
        },
        h3: {
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: '1.75rem',
        },
        h4: {
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        h5: {
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: '1.25rem',
        },
        h6: {
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: '1rem',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    shadows: [
        'none',
        '0 2px 4px rgba(0,0,0,0.05)',
        '0 4px 8px rgba(0,0,0,0.08)',
        '0 8px 16px rgba(0,0,0,0.1)',
        '0 12px 24px rgba(0,0,0,0.12)',
        '0 16px 32px rgba(0,0,0,0.15)',
        '0 20px 40px rgba(0,0,0,0.18)',
        '0 24px 48px rgba(0,0,0,0.2)',
        '0 10px 40px rgba(102, 126, 234, 0.15)',
        '0 10px 40px rgba(102, 126, 234, 0.2)',
        '0 10px 40px rgba(102, 126, 234, 0.25)',
        '0 10px 40px rgba(102, 126, 234, 0.3)',
        '0 10px 40px rgba(102, 126, 234, 0.35)',
        '0 10px 40px rgba(102, 126, 234, 0.4)',
        '0 10px 40px rgba(102, 126, 234, 0.45)',
        '0 10px 40px rgba(102, 126, 234, 0.5)',
        '0 10px 40px rgba(102, 126, 234, 0.55)',
        '0 10px 40px rgba(102, 126, 234, 0.6)',
        '0 10px 40px rgba(102, 126, 234, 0.65)',
        '0 10px 40px rgba(102, 126, 234, 0.7)',
        '0 10px 40px rgba(102, 126, 234, 0.75)',
        '0 10px 40px rgba(102, 126, 234, 0.8)',
        '0 10px 40px rgba(102, 126, 234, 0.85)',
        '0 10px 40px rgba(102, 126, 234, 0.9)',
        '0 10px 40px rgba(102, 126, 234, 0.95)',
    ],
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '10px 24px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    },
                },
                contained: {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd4 0%, #63408a 100%)',
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.2)',
                        transform: 'translateY(-4px)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        '&:hover fieldset': {
                            borderColor: '#667eea',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#667eea',
                            boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                        },
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                },
            },
        },
    },
});

export default theme;
