'use client';

import { useState, useMemo } from 'react';
import { Inter, Poppins } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});



export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
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
          background: {
            default: darkMode ? '#0a0a0a' : '#f5f7fa',
            paper: darkMode ? '#1a1a1a' : '#ffffff',
          },
          text: {
            primary: darkMode ? '#ededed' : '#2d3748',
            secondary: darkMode ? '#a0a0a0' : '#718096',
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
          button: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                padding: '10px 24px',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                },
              },
              contained: {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd4 0%, #63408a 100%)',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              },
            },
          },
        },
      }),
    [darkMode]
  );

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <AppBar position="static" elevation={0}>
              <Toolbar>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
                  😊 Mood Tracker
                </Typography>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton
                    onClick={() => setDarkMode(!darkMode)}
                    color="inherit"
                    aria-label="toggle dark mode"
                  >
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                </Box>
              </Toolbar>
            </AppBar>

            <Box
              component="main"
              sx={{
                minHeight: 'calc(100vh - 64px)',
                background: darkMode
                  ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                py: 4,
              }}
            >
              <Container maxWidth="md">
                {children}
              </Container>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
