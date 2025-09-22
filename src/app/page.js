'use client';

import { Typography, Box, Grid, Card, CardContent, Button } from '@mui/material';
import { Business, TrendingUp, LocationOn, People, MonetizationOn, Security } from '@mui/icons-material';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: 'Total Companies',
      description: 'View total number of companies in our database',
      icon: <Business />,
      href: '/companies/count',
      color: '#1976d2'
    },
    {
      title: 'Top Paid Companies',
      description: 'Explore companies with highest salary packages',
      icon: <TrendingUp />,
      href: '/companies/top-paid',
      color: '#dc004e'
    },
    {
      title: 'Companies by Skills',
      description: 'Find companies hiring for specific skills',
      icon: <MonetizationOn />,
      href: '/companies/by-skill/JavaScript',
      color: '#388e3c'
    },
    {
      title: 'Companies by Location',
      description: 'Browse companies in different cities',
      icon: <LocationOn />,
      href: '/companies/by-location/Bangalore',
      color: '#f57c00'
    },
    {
      title: 'Companies by Headcount',
      description: 'Filter companies by employee count range',
      icon: <People />,
      href: '/companies/headcount-range',
      color: '#7b1fa2'
    },
    {
      title: 'Companies by Benefits',
      description: 'Search companies offering specific benefits',
      icon: <Security />,
      href: '/companies/benefit/Insurance',
      color: '#d32f2f'
    }
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        textAlign="center"
        sx={{ mb: 2, fontWeight: 'bold' }}
      >
        Company Analytics Dashboard
      </Typography>
      
      <Typography 
        variant="h6" 
        textAlign="center" 
        color="text.secondary"
        sx={{ mb: 6 }}
      >
        Explore comprehensive company data with our interactive dashboard
      </Typography>

      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                minHeight: 280,
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <CardContent 
                sx={{ 
                  textAlign: 'center', 
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1
                }}
              >
                <Box>
                  <Box 
                    sx={{ 
                      color: feature.color,
                      mb: 2,
                      '& svg': { fontSize: 48 }
                    }}
                  >
                    {feature.icon}
                  </Box>
                  
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    gutterBottom
                    sx={{ 
                      minHeight: '3.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 3,
                      minHeight: '3rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
                
                <Button
                  component={Link}
                  href={feature.href}
                  variant="contained"
                  sx={{ 
                    backgroundColor: feature.color,
                    mt: 'auto',
                    '&:hover': {
                      backgroundColor: feature.color,
                      filter: 'brightness(0.9)'
                    }
                  }}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
