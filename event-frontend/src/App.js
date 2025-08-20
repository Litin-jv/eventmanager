import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';
import EventDetail from './components/EventDetail';
import EditEvent from './components/EditEvent';
import Profile from './components/Profile';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/events" element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <EventList />
                  </>
                </ProtectedRoute>
              } />
              <Route path="/create-event" element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <CreateEvent />
                  </>
                </ProtectedRoute>
              } />
              <Route path="/events/:id" element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <EventDetail />
                  </>
                </ProtectedRoute>
              } />
              <Route path="/edit-event/:id" element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <EditEvent />
                  </>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Profile />
                  </>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
