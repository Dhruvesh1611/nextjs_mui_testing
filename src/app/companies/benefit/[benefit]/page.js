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
  Button
} from '@mui/material';
import { Security, Business, LocationOn, People, AttachMoney, Search } from '@mui/icons-material';
import { useParams, useRouter } from 'next/navigation';

export default function CompaniesByBenefitPage() {
  const params = useParams();
  const router = useRouter();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchBenefit, setSearchBenefit] = useState(params.benefit || '');

  const fetchCompanies = async (benefit) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/companies/benefit/${encodeURIComponent(benefit)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCompanies(data.items || []);
    } catch (err) {
      console.error('Failed to fetch companies by benefit:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.benefit) {
      fetchCompanies(params.benefit);
    }
  }, [params.benefit]);

  const handleSearch = () => {
    if (searchBenefit.trim()) {
      router.push(`/companies/benefit/${encodeURIComponent(searchBenefit.trim())}`);
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

  const getBenefitIcon = (benefit) => {
    const benefitLower = benefit.toLowerCase();
    if (benefitLower.includes('insurance') || benefitLower.includes('health')) {
      return '🏥';
    } else if (benefitLower.includes('vacation') || benefitLower.includes('leave')) {
      return '🏖️';
    } else if (benefitLower.includes('bonus') || benefitLower.includes('salary')) {
      return '💰';
    } else if (benefitLower.includes('remote') || benefitLower.includes('work')) {
      return '🏠';
    } else if (benefitLower.includes('education') || benefitLower.includes('training')) {
      return '📚';
    }
    return '🎁';
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
          Companies by Benefits
        </Typography>

        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="center" 
          gap={2} 
          sx={{ mb: 4 }}
        >
          <TextField
            label="Search by Benefit"
            variant="outlined"
            value={searchBenefit}
            onChange={(e) => setSearchBenefit(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ minWidth: 300 }}
            placeholder="e.g., Insurance, Remote Work, Bonus"
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            startIcon={<Search />}
            sx={{ height: 56 }}
          >
            Search
          </Button>
        </Box>

        {params.benefit && (
          <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
            <Chip 
              icon={<Security />}
              label={`Benefit: ${params.benefit}`}
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
        ) : companies.length === 0 ? (
          <Alert severity="info">
            No companies found offering "{params.benefit}" benefit.
          </Alert>
        ) : (
          <>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ mb: 3 }}
            >
              Found {companies.length} companies offering "{params.benefit}"
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

                      {company.salaryBand?.base && (
                        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                          <AttachMoney sx={{ mr: 1, color: 'success.main', fontSize: 20 }} />
                          <Typography variant="body2" color="success.main" fontWeight="bold">
                            {formatSalary(company.salaryBand.base)}
                          </Typography>
                        </Box>
                      )}

                      {company.benefits && company.benefits.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            All Benefits:
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={0.5}>
                            {company.benefits.map((benefit, idx) => (
                              <Chip 
                                key={idx}
                                label={
                                  <Box display="flex" alignItems="center" gap={0.5}>
                                    <span>{getBenefitIcon(benefit)}</span>
                                    <span>{benefit}</span>
                                  </Box>
                                }
                                size="small"
                                variant={benefit.toLowerCase().includes(params.benefit.toLowerCase()) ? "filled" : "outlined"}
                                color={benefit.toLowerCase().includes(params.benefit.toLowerCase()) ? "secondary" : "default"}
                                sx={{ 
                                  maxWidth: '100%',
                                  '& .MuiChip-label': {
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }
                                }}
                              />
                            ))}
                          </Box>
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
                                color="primary"
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
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Container>
  );
}
