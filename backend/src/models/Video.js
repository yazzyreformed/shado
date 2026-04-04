const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  s3Url: {
    type: String,
    required: true
  },
  subtitleUrl: {
    type: String, // AWS S3 Link to the .vtt file
    default: null
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
