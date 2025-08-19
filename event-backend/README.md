# Event Management Backend API

A RESTful API for managing events with user authentication and authorization.

## Features

- User authentication (JWT-based)
- User registration and login
- CRUD operations for events
- Simple and clean event structure
- User roles (user, admin)

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/event-management
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=30d
   ```
4. Make sure MongoDB is running
5. Start the server:
   ```bash
   npm start
   # or for development with nodemon:
   npm run dev
   ```

## API Endpoints

### Authentication Routes

#### POST /api/auth/register
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /api/auth/login
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET /api/auth/profile
Get user profile (Protected)
- Headers: `Authorization: Bearer <token>`

#### PUT /api/auth/profile
Update user profile (Protected)
- Headers: `Authorization: Bearer <token>`

### Event Routes

#### GET /api/events
Get all events

#### GET /api/events/:id
Get a specific event by ID

#### POST /api/events
Create a new event (Protected)
- Headers: `Authorization: Bearer <token>`
```json
{
  "title": "Tech Conference 2024",
  "description": "Annual technology conference",
  "date": "2024-12-15",
  "location": "Convention Center"
}
```

#### PUT /api/events/:id
Update an event (Protected - Creator or Admin only)
- Headers: `Authorization: Bearer <token>`

#### DELETE /api/events/:id
Delete an event (Protected - Creator or Admin only)
- Headers: `Authorization: Bearer <token>`

## Event Model Structure

The Event model contains only these essential fields:

- **title**: Event title (required, max 100 characters)
- **description**: Event description (required, max 1000 characters)
- **date**: Event date (required)
- **location**: Event location (required, max 200 characters)
- **createdBy**: Reference to User who created the event (required)
- **createdAt**: Timestamp when event was created (auto-generated)

## User Roles

- user: Basic user permissions
- admin: Full access to all operations

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- Role-based authorization
- Input validation

## Development

To run in development mode with auto-restart:
```bash
npm run dev
```

## Testing

You can test the API using tools like:
- Postman
- Insomnia
- cURL
- Thunder Client (VS Code extension)

## License

ISC
