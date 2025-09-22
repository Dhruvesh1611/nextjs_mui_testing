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
import { Code, LocationOn, People, AttachMoney, Search } from '@mui/icons-material';
import { useParams, useRouter } from 'next/navigation';

export default function CompaniesBySkillPage() {
  const params = useParams();
  const router = useRouter();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchSkill, setSearchSkill] = useState(params.skill || '');

  const fetchCompanies = async (skill) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/companies/by-skill/${encodeURIComponent(skill)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCompanies(data.items || []);
    } catch (err) {
      console.error('Failed to fetch companies by skill:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.skill) {
      fetchCompanies(params.skill);
    }
  }, [params.skill]);

  const handleSearch = () => {
    if (searchSkill.trim()) {
      router.push(`/companies/by-skill/${encodeURIComponent(searchSkill.trim())}`);
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
          Companies by Skill
        </Typography>

        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="center" 
          gap={2} 
          sx={{ mb: 4 }}
        >
          <TextField
            label="Search by Skill"
            variant="outlined"
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ minWidth: 300 }}
            placeholder="e.g., JavaScript, Python, React"
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

        {params.skill && (
          <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
            <Chip 
              icon={<Code />}
              label={`Skill: ${params.skill}`}
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
            No companies found requiring the skill &quot;{params.skill}&quot;.
          </Alert>
        ) : (
          <>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ mb: 3 }}
            >
              Found {companies.length} companies requiring &quot;{params.skill}&quot;
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
                          <Code />
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

                      {company.hiringCriteria?.skills && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Required Skills:
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={0.5}>
                            {company.hiringCriteria.skills.slice(0, 5).map((skill, idx) => (
                              <Chip 
                                key={idx}
                                label={skill}
                                size="small"
                                variant={skill.toLowerCase() === params.skill.toLowerCase() ? "filled" : "outlined"}
                                color={skill.toLowerCase() === params.skill.toLowerCase() ? "primary" : "default"}
                              />
                            ))}
                            {company.hiringCriteria.skills.length > 5 && (
                              <Chip 
                                label={`+${company.hiringCriteria.skills.length - 5} more`}
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
