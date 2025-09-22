'use client';

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Container } from '@mui/material';
import { Brightness4, Brightness7, Home } from '@mui/icons-material';
import { useState, createContext, useContext } from 'react';
import Link from 'next/link';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function useColorMode() {
  return useContext(ColorModeContext);
}

function AppBarComponent() {
  const { toggleColorMode, mode } = useColorMode();

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <IconButton
          component={Link}
          href="/"
          color="inherit"
          sx={{ mr: 2 }}
        >
          <Home />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Company Analytics Dashboard
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
          <Button
            color="inherit"
            component={Link}
            href="/companies/count"
            size="small"
          >
            Count
          </Button>
          <Button
            color="inherit"
            component={Link}
            href="/companies/top-paid"
            size="small"
          >
            Top Paid
          </Button>
          <Button
            color="inherit"
            component={Link}
            href="/companies/by-skill/JavaScript"
            size="small"
          >
            Skills
          </Button>
          <Button
            color="inherit"
            component={Link}
            href="/companies/by-location/Bangalore"
            size="small"
          >
            Locations
          </Button>
          <Button
            color="inherit"
            component={Link}
            href="/companies/headcount-range"
            size="small"
          >
            Headcount
          </Button>
          <Button
            color="inherit"
            component={Link}
            href="/companies/benefit/Insurance"
            size="small"
          >
            Benefits
          </Button>
        </Box>

        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default function MUIThemeProvider({ children }) {
  const [mode, setMode] = useState('light');

  const colorMode = {
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
    mode
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    typography: {
      fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'dark' 
              ? '0 4px 20px rgba(0,0,0,0.3)' 
              : '0 4px 20px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
    },
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBarComponent />
        <Container maxWidth="lg">
          {children}
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
