# Event Management Frontend

A modern React frontend for the Event Management System, built with Material-UI and connected to the Node.js backend.

## Features

- **User Authentication**: Login and registration with JWT tokens
- **Event Management**: Create, read, update, and delete events
- **Responsive Design**: Mobile-friendly interface using Material-UI
- **Protected Routes**: Secure access to authenticated features
- **Real-time Updates**: Immediate feedback on user actions

## Tech Stack

- **React 18** - Modern React with hooks
- **Material-UI (MUI)** - Beautiful, accessible UI components
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Day.js** - Date manipulation library
- **Context API** - State management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.js       # Navigation bar
│   ├── Login.js        # Login form
│   ├── Register.js     # Registration form
│   ├── EventList.js    # List of all events
│   ├── EventDetail.js  # Single event view
│   ├── CreateEvent.js  # Create new event form
│   ├── EditEvent.js    # Edit existing event form
│   └── Profile.js      # User profile management
├── contexts/            # React contexts
│   └── AuthContext.js  # Authentication state management
├── App.js              # Main application component
└── index.js            # Application entry point
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## API Endpoints

The frontend connects to these backend endpoints:

- **Authentication**: `/api/auth/*`
- **Events**: `/api/events/*`

## Features

### Public Routes
- View all events
- Event details
- Login/Registration

### Protected Routes (Require Authentication)
- Create new events
- Edit own events
- Delete own events
- User profile management

## Usage

1. **Register/Login**: Create an account or sign in
2. **Browse Events**: View all available events
3. **Create Events**: Add new events (authenticated users only)
4. **Manage Events**: Edit or delete your own events
5. **Profile**: Update your account information

## Styling

The application uses Material-UI's design system with:
- Consistent color scheme
- Responsive grid layout
- Modern card-based design
- Accessible form components

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

- **Hot Reload**: Changes automatically refresh in the browser
- **Error Handling**: Comprehensive error messages and validation
- **Loading States**: Visual feedback during API calls
- **Responsive**: Works on all device sizes

## Troubleshooting

- **Backend Connection**: Ensure your backend is running on port 5000
- **CORS Issues**: Backend should have CORS enabled
- **Authentication**: Check browser console for JWT token issues
- **Port Conflicts**: Change port if 3000 is already in use

## License

ISC
