import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import NotificationDetailsPage from './pages/NotificationDetailsPage';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1f2937',
      light: '#374151',
      dark: '#0f172a',
    },
    secondary: {
      main: '#64748b',
      light: '#94a3b8',
      dark: '#334155',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
    divider: '#e2e8f0',
    success: {
      main: '#0f766e',
    },
    info: {
      main: '#2563eb',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.4px',
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 600,
    },
    body2: {
      color: '#475569',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
        },
        outlined: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
        },
        outlined: {
          borderColor: '#e2e8f0',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700,
          textTransform: 'none',
        },
      },
    },
  },
});

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <HomePage />
        </>
      ),
    },
    {
      path: '/notifications/:id',
      element: (
        <>
          <Navbar />
          <NotificationDetailsPage />
        </>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
