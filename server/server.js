const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const taskRoutes = require('./routes/tasks');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Task Manager API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});