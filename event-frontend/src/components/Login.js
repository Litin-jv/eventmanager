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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
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
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/events');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{ 
          mt: 12,
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        {/* Icon Header */}
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
          Sign In
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
              value={formData.password}
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
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link 
                component={RouterLink} 
                to="/register" 
                variant="body2"
                sx={{ 
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Don't have an account? Sign up
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
