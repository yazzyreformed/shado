require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const videoRoutes = require('./src/routes/videoRoutes');
const shadowingRoutes = require('./src/routes/shadowingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Base Route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to ShadoWEB API' });
});

// Routes
app.use('/api/videos', videoRoutes);
app.use('/api/shadowing', shadowingRoutes);

// Serve Static Frontend (React Dist)
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shadoweb')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
