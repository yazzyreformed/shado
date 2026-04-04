const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const Video = require('../models/Video');

// Complete a shadowing session
router.post('/complete', async (req, res) => {
  try {
    const { userId, videoId } = req.body;
    
    if (!userId || !videoId) {
      return res.status(400).json({ message: 'Missing userId or videoId' });
    }

    const activity = new Activity({ userId, videoId });
    await activity.save();

    res.status(201).json({ message: 'Shadowing activity recorded successfully', activity });
  } catch (error) {
    res.status(500).json({ message: 'Error saving activity', error: error.message });
  }
});

// Get user stats
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const activities = await Activity.find({ userId }).populate('videoId').sort({ completedAt: -1 });
    
    // Quick calculations
    const totalSessions = activities.length;
    
    // Calculate unique days
    const daysSet = new Set(activities.map(a => new Date(a.completedAt).toDateString()));
    const totalStudyDays = daysSet.size;

    // Last studied
    const lastSessionDate = activities.length > 0 ? activities[0].completedAt : null;

    res.json({
      totalSessions,
      totalStudyDays,
      lastSessionDate,
      recentActivities: activities.slice(0, 5) // top 5 recent
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});

module.exports = router;
