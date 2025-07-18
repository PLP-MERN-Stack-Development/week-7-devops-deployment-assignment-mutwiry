const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Use routes
app.use('/api/auth', authRoutes);

// In-memory blog posts (you can later move this to MongoDB)
let posts = [
  { id: 1, title: 'Welcome to the Blog!', content: 'This is your first post.', author: 'System', createdAt: new Date() }
];

// Get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Get a single post
app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// Create a new post (protected route - you can add auth middleware here later)
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { 
    id: posts.length + 1, 
    title, 
    content, 
    author: 'Anonymous', // You can get this from auth middleware
    createdAt: new Date()
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update a post
app.put('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  res.json(post);
});

// Delete a post
app.delete('/api/posts/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Post not found' });
  posts.splice(index, 1);
  res.status(204).end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 