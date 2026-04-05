const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const Activity = require('../models/Activity');

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
// Get Discover feed (videos not yet shadowed by user)
router.get('/discover/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find all video IDs the user has activities for
    const userActivities = await Activity.find({ userId }).select('videoId');
    const shadowedVideoIds = userActivities.map(a => a.videoId);

    // Find videos NOT in the shadowed list
    const discoverVideos = await Video.find({ _id: { $nin: shadowedVideoIds } });
    
    // If the user has shadowed EVERYTHING, just return all videos so the feed isn't empty
    if (discoverVideos.length === 0) {
      const allVideos = await Video.find();
      return res.json(allVideos);
    }
    
    res.json(discoverVideos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching discover feed', error: error.message });
  }
});

// Get a specific video by ID
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching video', error: error.message });
  }
});

module.exports = router;
