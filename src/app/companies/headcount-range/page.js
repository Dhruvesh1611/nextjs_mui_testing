'use client';

import { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert,
  Chip,
  Avatar,
  TextField,
  Button,
  Paper
} from '@mui/material';
import { People, Business, LocationOn, AttachMoney, Search } from '@mui/icons-material';

export default function CompaniesByHeadcountPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [minHeadcount, setMinHeadcount] = useState('');
  const [maxHeadcount, setMaxHeadcount] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (minHeadcount) params.append('min', minHeadcount);
      if (maxHeadcount) params.append('max', maxHeadcount);
      
      const response = await fetch(`/api/companies/headcount-range?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCompanies(data.items || []);
      setHasSearched(true);
    } catch (err) {
      console.error('Failed to fetch companies by headcount:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (minHeadcount || maxHeadcount) {
      fetchCompanies();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Not specified';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(salary);
  };

  const formatHeadcount = (headcount) => {
    if (!headcount) return 'Not specified';
    return headcount.toLocaleString();
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
          Companies by Headcount Range
        </Typography>
        
        <Typography 
          variant="h6" 
          textAlign="center" 
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Filter companies by employee count range
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Search Parameters
          </Typography>
          
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                label="Minimum Headcount"
                variant="outlined"
                type="number"
                fullWidth
                value={minHeadcount}
                onChange={(e) => setMinHeadcount(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., 100"
                inputProps={{ min: 0 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                label="Maximum Headcount"
                variant="outlined"
                type="number"
                fullWidth
                value={maxHeadcount}
                onChange={(e) => setMaxHeadcount(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., 5000"
                inputProps={{ min: 0 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                onClick={handleSearch}
                startIcon={<Search />}
                fullWidth
                sx={{ height: 56 }}
                disabled={!minHeadcount && !maxHeadcount}
              >
                Search Companies
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              • Enter minimum headcount to find companies with at least that many employees
              • Enter maximum headcount to set an upper limit
              • Use both to define a specific range
            </Typography>
          </Box>
        </Paper>

        {(minHeadcount || maxHeadcount) && (
          <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
            <Chip 
              icon={<People />}
              label={`Headcount: ${minHeadcount || '0'}${maxHeadcount ? ` - ${maxHeadcount}` : '+'} employees`}
              color="primary"
              variant="outlined"
              sx={{ fontSize: '1rem', py: 2, px: 1 }}
            />
          </Box>
        )}

        {loading ? (
          <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="400px"
          >
            <CircularProgress size={60} />
          </Box>
        ) : error ? (
          <Alert severity="error">
            Failed to load companies: {error}
          </Alert>
        ) : hasSearched && companies.length === 0 ? (
          <Alert severity="info">
            No companies found with headcount in the specified range.
          </Alert>
        ) : hasSearched ? (
          <>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ mb: 3 }}
            >
              Found {companies.length} companies in the specified headcount range
            </Typography>

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
                      }
                    }}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          <Business />
                        </Avatar>
                        <Typography variant="h6" component="h2">
                          {company.name || 'Unknown Company'}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                        <People sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                        <Typography variant="body1" color="primary.main" fontWeight="bold">
                          {formatHeadcount(company.headcount)} employees
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                        <LocationOn sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                        <Typography variant="body2" color="text.secondary">
                          {company.location || 'Location not specified'}
                        </Typography>
                      </Box>

                      {company.salaryBand?.base && (
                        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                          <AttachMoney sx={{ mr: 1, color: 'success.main', fontSize: 20 }} />
                          <Typography variant="body2" color="success.main" fontWeight="bold">
                            {formatSalary(company.salaryBand.base)}
                          </Typography>
                        </Box>
                      )}

                      {company.hiringCriteria?.skills && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Skills Required:
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={0.5}>
                            {company.hiringCriteria.skills.slice(0, 3).map((skill, idx) => (
                              <Chip 
                                key={idx}
                                label={skill}
                                size="small"
                                variant="outlined"
                                color="default"
                              />
                            ))}
                            {company.hiringCriteria.skills.length > 3 && (
                              <Chip 
                                label={`+${company.hiringCriteria.skills.length - 3} more`}
                                size="small"
                                variant="outlined"
                              />
                            )}
                          </Box>
                        </Box>
                      )}

                      <Box sx={{ mt: 2 }}>
                        <Chip 
                          label={company.headcount < 1000 ? 'Small' : company.headcount < 5000 ? 'Medium' : 'Large'}
                          size="small"
                          color={company.headcount < 1000 ? 'success' : company.headcount < 5000 ? 'warning' : 'error'}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Box textAlign="center" sx={{ py: 8 }}>
            <People sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Enter headcount parameters above to search for companies
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}
