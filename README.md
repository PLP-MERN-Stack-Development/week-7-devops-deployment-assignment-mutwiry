# 🚀 Modern Blog System - MERN Stack with Authentication

## # 🚀 Modern Blog System - MERN Stack with Authentication

**Live Demo:**  
[https://week-7-mern.vercel.app/](https://week-7-mern.vercel.app/)


A full-stack blog application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, CRUD operations for blog posts, and a modern responsive UI.

## ✨ Features

- **User Authentication**
  - User registration and login
  - JWT token-based authentication
  - Secure password hashing with bcrypt
  - Protected routes and user sessions

- **Blog Management**
  - Create, read, update, and delete blog posts
  - Search functionality
  - Responsive design
  - Modern UI with smooth animations

- **Security**
  - Password hashing with bcryptjs
  - JWT token authentication
  - Input validation
  - CORS configuration

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **CSS3** - Styling with modern features
- **Font Awesome** - Icons

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd week-7-devops-deployment-assignment-DennisAmutsa
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   pnpm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   pnpm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```bash
   cd ../server
   cp env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blog-app
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

5. **Start the backend server**
   ```bash
   cd server
   pnpm start
   # or for development with nodemon
   pnpm dev
   ```

6. **Start the frontend development server**
   ```bash
   cd client
   pnpm dev
   ```

7. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
week-7-devops-deployment-assignment-DennisAmutsa/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx         # Main app component
│   │   ├── App.css         # Styles
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── models/             # MongoDB models
│   │   └── User.js
│   ├── routes/             # API routes
│   │   └── auth.js
│   ├── middleware/         # Custom middleware
│   │   └── auth.js
│   ├── index.js            # Server entry point
│   ├── package.json
│   └── env.example         # Environment variables template
└── README.md
```

## 🔐 Authentication API Endpoints

### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```
GET /api/auth/me
Authorization: Bearer <jwt-token>
```

## 📝 Blog API Endpoints

### Get All Posts
```
GET /api/posts
```

### Get Single Post
```
GET /api/posts/:id
```

### Create Post
```
POST /api/posts
Content-Type: application/json

{
  "title": "My Blog Post",
  "content": "This is the content of my blog post."
}
```

### Update Post
```
PUT /api/posts/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content."
}
```

### Delete Post
```
DELETE /api/posts/:id
```

## 🚀 Deployment

### Backend Deployment (Railway)

1. **Create a Railway account** at [railway.app](https://railway.app)
2. **Create a new project**
3. **Connect your GitHub repository**
4. **Add a new service:**
   - **Service Type**: `GitHub Repo`
   - **Repository**: Select your repository
   - **Branch**: `main` or `master`
   - **Root Directory**: `server`

5. **Configure the service:**
   - **Name**: `your-app-backend`
   - **Environment**: `Node.js`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

6. **Set Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app
   JWT_SECRET=your-super-secret-jwt-key
   CLIENT_URL=https://your-frontend-url.vercel.app
   PORT=5000
   ```

### Frontend Deployment (Vercel)

1. **Create a Vercel account** at [vercel.com](https://vercel.com)
2. **Import your GitHub repository**
3. **Configure the project:**
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Set Environment Variables:**
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```

### CI/CD Pipeline

The project includes GitHub Actions for automated testing and deployment:

- **Automatic testing** on push and pull requests
- **Automatic deployment** to production on main branch
- **Backend deployment** to Railway
- **Frontend deployment** to Vercel

### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app
JWT_SECRET=your-super-secret-jwt-key
CLIENT_URL=https://your-frontend-url.vercel.app
```

#### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

## 📊 Monitoring

### Health Check Endpoint
```
GET /health
```
Returns server status, timestamp, and uptime.

### Performance Monitoring
- Server uptime monitoring via Railway
- Frontend performance monitoring via Vercel Analytics
- Error tracking and logging

### GitHub Secrets Setup

In your GitHub repository settings, add these secrets for CI/CD:

- `MONGODB_URI` - Your MongoDB Atlas connection string
- `JWT_SECRET` - Your JWT secret key
- `RAILWAY_TOKEN` - Your Railway API token
- `RAILWAY_SERVICE` - Your Railway service name
- `VERCEL_TOKEN` - Your Vercel API token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID

## 🎨 Features in Detail

### Authentication Flow
1. User registers with username, email, and password
2. Password is hashed using bcryptjs
3. JWT token is generated and returned
4. Token is stored in localStorage
5. Protected routes check for valid token
6. User can logout to clear token

### Blog Management
- **Create Posts**: Authenticated users can create new blog posts
- **Read Posts**: All users can view posts (public)
- **Update Posts**: Users can edit their posts
- **Delete Posts**: Users can delete their posts
- **Search**: Real-time search through post titles and content

### Responsive Design
- Mobile-first approach
- Smooth animations and transitions
- Modern gradient backgrounds
- Card-based layout
- Touch-friendly interface

## 🔧 Development

...

### Adding New Features
1. Create new components in `client/src/components/`
2. Add new routes in `server/routes/`
3. Create new models in `server/models/` if needed
4. Update the main App component to include new features

### Environment Variables
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas cluster
2. Deploy to Render, Railway, or Heroku
3. Configure environment variables
4. Set up continuous deployment

### Frontend Deployment
1. Build the React app: `pnpm build`
2. Deploy to Vercel, Netlify, or GitHub Pages
3. Configure environment variables for API URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Font Awesome for icons
- MongoDB Atlas for database hosting
- Vite for fast development experience 
