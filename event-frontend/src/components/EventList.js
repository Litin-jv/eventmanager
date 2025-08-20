import React, { useState, useEffect, useCallback } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Box,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import dayjs from 'dayjs';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      // Sort events by date (upcoming first)
      const sortedEvents = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(sortedEvents);
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${eventId}`);
        fetchEvents(); // Refresh the list
      } catch (err) {
        alert('Failed to delete event');
      }
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 6 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      {/* Header */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <EventAvailableIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Upcoming Events
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Discover and manage your events with ease
        </Typography>
      </Box>

      {/* No Events Message */}
      {events.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Typography variant="h6" color="text.secondary">
            No events found. Create the first event using the "Add Event" button!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card 
                elevation={4} 
                sx={{ 
                  borderRadius: 3, 
                  height: '100%', 
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 }
                }}
              >
                <CardContent>
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    gutterBottom 
                    fontWeight={600}
                  >
                    {event.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{ minHeight: 60 }}
                  >
                    {event.description}
                  </Typography>

                  <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip 
                      label={dayjs(event.date).format('MMM DD, YYYY')} 
                      size="small" 
                      color="primary" 
                      sx={{ fontWeight: 500 }}
                    />
                    <Chip 
                      label={event.location} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontWeight: 500 }}
                    />
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    Created by: {event.createdBy?.name || 'Unknown'}
                  </Typography>
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button 
                    size="small" 
                    component={RouterLink} 
                    to={`/events/${event._id}`}
                    sx={{ textTransform: 'none' }}
                  >
                    View Details
                  </Button>

                  {user && (event.createdBy?._id === user._id || user.role === 'admin') && (
                    <>
                      <Button 
                        size="small" 
                        component={RouterLink} 
                        to={`/edit-event/${event._id}`}
                        sx={{ textTransform: 'none', color: 'primary.main' }}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteEvent(event._id)}
                        sx={{ textTransform: 'none' }}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default EventList;
