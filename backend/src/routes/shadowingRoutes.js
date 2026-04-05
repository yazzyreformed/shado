const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const Video = require('../models/Video');

// Complete a shadowing session (Max 1 per day per video per user)
router.post('/complete', async (req, res) => {
  try {
    const { userId, videoId } = req.body;
    
    if (!userId || !videoId) {
      return res.status(400).json({ message: 'Missing userId or videoId' });
    }

    // Check if there is already an activity today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingActivity = await Activity.findOne({
      userId,
      videoId,
      completedAt: { $gte: startOfDay, $lte: endOfDay }
    });

    if (existingActivity) {
      return res.status(429).json({ message: 'You have already shadowed this video today! Come back tomorrow.' });
    }

    const activity = new Activity({ userId, videoId });
    await activity.save();

    res.status(201).json({ message: 'Shadowing activity recorded successfully', activity });
  } catch (error) {
    res.status(500).json({ message: 'Error saving activity', error: error.message });
  }
});

// Get user's active ShadowList (grouped by video, containing dates)
router.get('/list/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const activities = await Activity.find({ userId }).populate('videoId').sort({ completedAt: 1 });
    
    const shadowMap = {};
    activities.forEach(activity => {
      const vid = activity.videoId;
      if (!vid) return; 
      
      const vIdStr = vid._id.toString();
      if (!shadowMap[vIdStr]) {
        shadowMap[vIdStr] = {
          video: vid,
          shadowCount: 0,
          dates: [] // to build the github calendar
        };
      }
      
      shadowMap[vIdStr].shadowCount += 1;
      shadowMap[vIdStr].dates.push(activity.completedAt);
    });

    res.json(Object.values(shadowMap));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shadowlist', error: error.message });
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
