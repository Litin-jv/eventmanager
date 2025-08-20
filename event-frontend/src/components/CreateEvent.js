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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: dayjs(),
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      date: newDate
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.description.trim() || !formData.location.trim()) {
      setError('All fields are required');
      return;
    }

    if (!formData.date || formData.date.isBefore(dayjs(), 'day')) {
      setError('Date must be today or in the future');
      return;
    }

    setLoading(true);

    try {
      const eventData = {
        ...formData,
        date: formData.date.toISOString()
      };

      await axios.post('http://localhost:5000/api/events', eventData);
      navigate('/events');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Create New Event
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Event Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Event Description"
                  name="description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your event"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Event Date"
                    value={formData.date}
                    onChange={handleDateChange}
                    slotProps={{ textField: { fullWidth: true, required: true } }}
                    minDate={dayjs()}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="Event Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Where is the event?"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                  >
                    {loading ? 'Creating Event...' : 'Create Event'}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/events')}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateEvent;
