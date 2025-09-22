'use client';

import { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert,
  Chip
} from '@mui/material';
import { Business } from '@mui/icons-material';

export default function CompaniesCountPage() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/companies/count');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCount(data.total);
      } catch (err) {
        console.error('Failed to fetch companies count:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="400px"
        >
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">
            Failed to load companies count: {error}
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          textAlign="center"
          sx={{ mb: 4, fontWeight: 'bold' }}
        >
          Total Companies
        </Typography>

        <Paper 
          elevation={3}
          sx={{ 
            p: 6, 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3
          }}
        >
          <Business sx={{ fontSize: 80, mb: 2, opacity: 0.9 }} />
          
          <Typography 
            variant="h2" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '3rem', sm: '4rem' }
            }}
          >
            {count?.toLocaleString()}
          </Typography>
          
          <Typography variant="h5" sx={{ mb: 3, opacity: 0.9 }}>
            Companies in our database
          </Typography>

          <Chip 
            label="Live Data" 
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontWeight: 'bold'
            }}
          />
        </Paper>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            This count represents all companies currently stored in our system.
            The data is updated in real-time as new companies are added.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
