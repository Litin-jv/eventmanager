import React, { useState, useEffect, useCallback } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Chip, 
  Button, 
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import dayjs from 'dayjs';

const EventDetail = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchEvent = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(response.data);
    } catch (err) {
      setError('Failed to fetch event details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const handleDeleteEvent = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        navigate('/events');
      } catch (err) {
        alert('Failed to delete event');
      }
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !event) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error || 'Event not found'}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              {event.title}
            </Typography>
            {user && (event.createdBy?._id === user._id || user.role === 'admin') && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to={`/edit-event/${event._id}`}
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteEvent}
                >
                  Delete
                </Button>
              </Box>
            )}
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" paragraph>
                {event.description}
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={1} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Event Details
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Date
                  </Typography>
                  <Chip 
                    label={dayjs(event.date).format('MMMM DD, YYYY')} 
                    color="primary" 
                    sx={{ mt: 1 }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Location
                  </Typography>
                  <Typography variant="body1">
                    {event.location}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Created by
                  </Typography>
                  <Typography variant="body1">
                    {event.createdBy?.name || 'Unknown'}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Created on
                  </Typography>
                  <Typography variant="body1">
                    {dayjs(event.createdAt).format('MMMM DD, YYYY')}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/events"
              color="primary"
            >
              Back to Events
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default EventDetail;
