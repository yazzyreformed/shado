const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// Get a random video
router.get('/random', async (req, res) => {
  try {
    const count = await Video.countDocuments();
    if (count === 0) {
      return res.status(404).json({ message: 'No videos found in database.' });
    }
    const random = Math.floor(Math.random() * count);
    const randomVideo = await Video.findOne().skip(random);
    res.json(randomVideo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching random video', error: error.message });
  }
});

module.exports = router;
