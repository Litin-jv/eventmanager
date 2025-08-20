import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
  const { _user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddEvent = () => {
    navigate('/create-event');
  };

  const handleHome = () => {
    navigate('/events');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <EventIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Event Manager
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={handleHome}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            variant="outlined"
            onClick={handleAddEvent}
          >
            Add Event
          </Button>
          <Button 
            color="inherit" 
            variant="outlined"
            onClick={handleProfile}
          >
            Profile
          </Button>
          <Button 
            color="inherit" 
            variant="outlined"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;