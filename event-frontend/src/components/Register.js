import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Alert,
  Link,
  Avatar
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        navigate('/events');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{ 
          mt: 10,
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        {/* Icon Header */}
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonAddAlt1Icon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
          Create Account
        </Typography>

        <Paper 
          elevation={6} 
          sx={{ 
            mt: 3, 
            p: 4, 
            width: '100%', 
            borderRadius: 3,
            background: 'linear-gradient(145deg, #ffffff, #f3f6f9)',
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              sx={{ borderRadius: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              sx={{ borderRadius: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              sx={{ borderRadius: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={{ borderRadius: 2 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ 
                mt: 3, mb: 2, py: 1.2, 
                borderRadius: 2, 
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                boxShadow: 3,
                '&:hover': { boxShadow: 6 }
              }}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link 
                component={RouterLink} 
                to="/login" 
                variant="body2"
                sx={{ 
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Already have an account? Sign in
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
