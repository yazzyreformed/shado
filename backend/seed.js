require('dotenv').config();
const mongoose = require('mongoose');
const Video = require('./src/models/Video');

const exampleVideos = [
  {
    title: 'Example English Conversation',
    s3Url: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
    subtitle: 'Hello! Welcome to the shadowing session. Shadowing helps you improve your pronunciation.',
    difficulty: 'easy'
  },
  {
    title: 'Advanced Tech Talk',
    s3Url: 'https://archive.org/download/ElephantsDream/ed_hd.mp4',
    subtitle: 'Cloud computing allows you to scale applications globally. By using S3 and EC2, you achieve high availability.',
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
