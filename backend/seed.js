require('dotenv').config();
const mongoose = require('mongoose');
const Video = require('./src/models/Video');

const exampleVideos = [
  {
    title: 'Example English Conversation',
    s3Url: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
    subtitleUrl: 'https://gist.githubusercontent.com/yasinzemheri/abcd/raw/sample.vtt', // You will replace this with your S3 .vtt URL!
    difficulty: 'easy'
  },
  {
    title: 'Advanced Tech Talk',
    s3Url: 'https://archive.org/download/ElephantsDream/ed_hd.mp4',
    subtitleUrl: 'https://gist.githubusercontent.com/yasinzemheri/abcd/raw/advanced.vtt', // You will replace this with your S3 .vtt URL!
    difficulty: 'hard'
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
