require('dotenv').config();
const mongoose = require('mongoose');
const Video = require('./src/models/Video');

const exampleVideos = [
  {
    title: 'BYS Video Scene',
    s3Url: 'https://shadoweb-videolar.s3.eu-north-1.amazonaws.com/bys.mp4',
    subtitleUrl: 'https://shadoweb-videolar.s3.eu-north-1.amazonaws.com/bys.vtt',
    difficulty: 'medium'
  },
  {
    title: 'DEX Advanced Scene',
    s3Url: 'https://shadoweb-videolar.s3.eu-north-1.amazonaws.com/dex.mp4',
    subtitleUrl: 'https://shadoweb-videolar.s3.eu-north-1.amazonaws.com/dex.vtt',
    difficulty: 'hard'
  },
  {
    title: 'SSS English Practice',
    s3Url: 'https://shadoweb-videolar.s3.eu-north-1.amazonaws.com/sss.mp4',
    subtitleUrl: 'https://shadoweb-videolar.s3.eu-north-1.amazonaws.com/sss.vtt',
    difficulty: 'easy'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shadoweb');
    console.log('Connected to DB...');
    
    // Clear old data
    await Video.deleteMany({});
    console.log('Cleared old videos.');

    // Insert examples
    await Video.insertMany(exampleVideos);
    console.log('Inserted fresh seed videos.');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error', error);
    process.exit(1);
  }
}

seed();
