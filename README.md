# DevCollabAI-Backend

A real-time collaborative development platform backend built with Node.js, Express, and Socket.IO, featuring AI-powered assistance for project collaboration.

##  Live Demo

[https://devcollabai-backend.onrender.com](https://devcollabai-backend.onrender.com)

##  Features

- **Real-time Collaboration**: Socket.IO-powered real-time messaging and project collaboration
- **AI Integration**: Built-in AI assistant using Google Generative AI that responds to @ai mentions
- **User Authentication**: JWT-based authentication with secure cookie handling
- **Project Management**: Create and manage collaborative projects
- **File Upload**: Cloudinary integration for file storage and management
- **Redis Caching**: Fast data retrieval with Redis integration
- **RESTful API**: Well-structured API endpoints for users, projects, and AI services

##  Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Real-time Communication**: Socket.IO
- **AI**: Google Generative AI
- **Cloud Storage**: Cloudinary
- **Caching**: Redis (ioredis)
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Validation**: Express Validator
- **File Upload**: express-fileupload

##  Project Structure

```
DevCollabAI-Backend/
├── config/          # Configuration files (database, cloudinary)
├── controllers/     # Route controllers
├── middlewares/     # Custom middleware functions
├── models/          # Mongoose models
├── routes/          # API routes
├── services/        # Business logic and AI services
├── app.js           # Express app configuration
├── server.js        # Server and Socket.IO setup
└── package.json     # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis
- Cloudinary account
- Google Generative AI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yogesh1078/DevCollabAI-Backend.git
cd DevCollabAI-Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

4. Start the server:
```bash
npm start
```

The server will start running at `http://localhost:3000`

##  API Endpoints

### User Routes
- `POST /users/register` - Register a new user
- `POST /users/login` - Login user
- `GET /users/profile` - Get user profile

### Project Routes
- `POST /projects` - Create a new project
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project by ID
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### AI Routes
- `POST /ai` - Send queries to AI assistant

### Cloudinary Routes
- `POST /cloud/upload` - Upload files to Cloudinary

##  Socket.IO Authentication

The Socket.IO connection requires:
- JWT token (passed via `auth.token` or `Authorization` header)
- Project ID (passed as query parameter)

Example client connection:
```javascript
const socket = io('http://localhost:3000', {
  auth: {
    token: 'your_jwt_token'
  },
  query: {
    projectId: 'your_project_id'
  }
});
```

##  Real-time Events

### Client Events
- `project-message` - Send a message to the project room

### Server Events
- `project-message` - Receive messages from other users or AI

### AI Assistant
Mention `@ai` in your message to trigger the AI assistant:
```javascript
socket.emit('project-message', {
  message: '@ai How do I implement authentication?',
  sender: userObject
});
```

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

##  Author

**yogesh1078**
- GitHub: [@yogesh1078](https://github.com/yogesh1078)

##  Acknowledgments

- Google Generative AI for AI capabilities
- Cloudinary for file storage
- Socket.IO for real-time communication
