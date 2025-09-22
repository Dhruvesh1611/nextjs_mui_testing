'use client';

import { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardHeader, 
  CardContent, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert,
  Chip,
  Avatar
} from '@mui/material';
import { TrendingUp, LocationOn, People, AttachMoney } from '@mui/icons-material';

export default function TopPaidCompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopPaidCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/companies/top-paid?limit=5');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCompanies(data.items || []);
      } catch (err) {
        console.error('Failed to fetch top paid companies:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPaidCompanies();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg">
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
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">
            Failed to load top paid companies: {error}
          </Alert>
        </Box>
      </Container>
    );
  }

  const formatSalary = (salary) => {
    if (!salary) return 'Not specified';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(salary);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          textAlign="center"
          sx={{ mb: 2, fontWeight: 'bold' }}
        >
          Top Paid Companies
        </Typography>
        
        <Typography 
          variant="h6" 
          textAlign="center" 
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Companies offering the highest base salaries
        </Typography>

        {companies.length === 0 ? (
          <Alert severity="info">
            No companies found in the database.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {companies.map((company, index) => (
              <Grid item xs={12} sm={6} md={4} key={company._id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    },
                    position: 'relative'
                  }}
                >
                  {index === 0 && (
                    <Chip 
                      label="Top Paid" 
                      color="secondary"
                      sx={{ 
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 1,
                        fontWeight: 'bold'
                      }}
                    />
                  )}

                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <TrendingUp />
                      </Avatar>
                    }
                    title={
                      <Typography variant="h6" component="h2" noWrap>
                        {company.name || 'Unknown Company'}
                      </Typography>
                    }
                    subheader={`Rank #${index + 1}`}
                  />

                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                        <AttachMoney sx={{ mr: 1, color: 'success.main' }} />
                        <Typography variant="h6" color="success.main" fontWeight="bold">
                          {formatSalary(company.salaryBand?.base)}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Base Salary
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                      <LocationOn sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">
                        {company.location || 'Location not specified'}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                      <People sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">
                        {company.headcount ? `${company.headcount.toLocaleString()} employees` : 'Size not specified'}
                      </Typography>
                    </Box>

                    {company.salaryBand?.bonus && (
                      <Box sx={{ mt: 2 }}>
                        <Chip 
                          label={`Bonus: ${formatSalary(company.salaryBand.bonus)}`}
                          variant="outlined"
                          size="small"
                          color="primary"
                        />
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
