# DevCollabAI-Backend

DevCollabAI-Backend is the backend server for DevCollabAI, an AI-powered collaborative development platform. It provides RESTful APIs and real-time features for user management, projects, file uploads, and AI-assisted coding using Gemini AI. Built entirely in JavaScript, it leverages Express, MongoDB, Cloudinary, Redis, and Socket.IO.

## Features

- **User Management**: Register, authenticate, and manage users.
- **Project Collaboration**: Create projects, manage participants, and update project file trees.
- **AI-Assisted Coding**: Integrates Gemini AI to provide coding assistance and code generation within collaborative rooms.
- **Real-time Communication**: Socket.IO based live chat and project messaging, with AI responses triggered by `@ai` mentions.
- **Secure File Uploads**: Upload and manage files using Cloudinary with strict file type validation.
- **Authentication & Authorization**: JWT-based user authentication and token blacklisting via Redis.
- **Database Integration**: MongoDB for persistent storage of users, projects, and files.

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- Redis instance
- Cloudinary account (for file uploads)
- Gemini AI API key

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
PORT=3000
MONGODB_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
REDIS_HOST=<your-redis-host>
REDIS_PORT=<your-redis-port>
REDIS_PASSWORD=<your-redis-password>
CLOUDINARY_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_KEY=<your-cloudinary-api-key>
CLOUDINARY_SECRET=<your-cloudinary-api-secret>
GEMINI_API=<your-gemini-api-key>
```

### Installation

```bash
npm install
```

### Running the Server

```bash
npm start
```

Server runs on the port specified in `.env` (defaults to 3000).

## API Endpoints

### User Routes

- `POST /users/register` - Register a new user
- `POST /users/login` - User login

### Project Routes

- `POST /projects` - Create a project
- `GET /projects` - List all projects for a user
- `PUT /projects/file-tree` - Update project file tree

### AI Routes

- `GET /ai/get-result` - Get AI-generated coding solution (requires prompt in request body)

### Cloudinary Routes

- `POST /cloud/upload` - Upload file to Cloudinary

### Real-Time Collaboration

- **Socket.IO**: Connect to the server for real-time messaging. Messages containing `@ai` trigger AI-generated responses.

## File Structure Overview

```
├── app.js                 # Express app setup and middleware
├── server.js              # HTTP & Socket.IO server
├── config/                # Database, Cloudinary, and AI user initialization
├── controllers/           # Route logic for AI, Cloudinary, Projects
├── middlewares/           # Auth middleware
├── models/                # Mongoose models (User, Project, File)
├── routes/                # Route definitions
├── services/              # Business logic for AI, Projects, Redis
```

## AI Integration

- Uses Gemini AI via `@google/generative-ai` for code generation and responses.
- Strict code formatting enforced in AI responses.
- AI user is initialized for collaborative interactions within projects.

## Security

- JWT authentication for API and Socket.IO connections.
- Blacklisted tokens tracked via Redis.
- AI user credentials are securely stored and initialized at server startup.

## Deployment

The backend can be deployed to any Node.js-compatible hosting. Environment variables must be set appropriately. [Demo Home Page](https://devcollabai-backend.onrender.com)

## License

This project currently has **no license** specified. Please contact the repository owner for usage terms.

---

**Author**: [yogesh1078](https://github.com/yogesh1078)
