import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Alert,
  Grid
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import dayjs from 'dayjs';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = () => {
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      confirmPassword: ''
    });
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      confirmPassword: ''
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password && formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const updateData = {
        name: formData.name,
        email: formData.email
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      const result = await updateProfile(updateData);
      if (result.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        setFormData({
          name: user.name,
          email: user.email,
          password: '',
          confirmPassword: ''
        });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred while updating profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">Please log in to view your profile.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            User Profile
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Profile Information
              </Typography>
              
              {!isEditing ? (
                <Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Name
                    </Typography>
                    <Typography variant="body1">
                      {user.name}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Email
                    </Typography>
                    <Typography variant="body1">
                      {user.email}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Role
                    </Typography>
                    <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                      {user.role}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Member Since
                    </Typography>
                    <Typography variant="body1">
                      {dayjs(user.createdAt).format('MMMM DD, YYYY')}
                    </Typography>
                  </Box>
                  
                  <Button
                    variant="contained"
                    onClick={handleEdit}
                    sx={{ mt: 2 }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="New Password (optional)"
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  
                  <TextField
                    margin="normal"
                    fullWidth
                    name="confirmPassword"
                    label="Confirm New Password"
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  
                  <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                    >
                      {loading ? 'Updating...' : 'Update Profile'}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              )}
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Account Statistics
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  This section can show user activity, events created, etc.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
