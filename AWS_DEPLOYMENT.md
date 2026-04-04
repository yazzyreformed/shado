# AWS Deployment Guide for ShadoWEB

This guide provides step-by-step instructions to deploy the ShadoWEB application on Amazon Web Services (AWS) using S3, EC2, and MongoDB Atlas.

## 1. Video Hosting (Amazon S3)
To serve videos directly to the client at high speed:
1. Go to the **S3 Console** and click "Create bucket".
2. Named it something like `shadoweb-videos`.
3. Disable "Block all public access" (if you want direct public access to videos) OR keep it locked and use Pre-signed URLs generated directly from the Node.js backend.
4. Upload your English Shadowing `.mp4` videos.
5. Copy the object URLs and use them to feed the database (via MongoDB/Seed).

> [!TIP]
> Make sure your S3 bucket has a CORS policy configured that allows GET requests from your frontend's domain.
> ```json
> [
>     {
>         "AllowedHeaders": ["*"],
>         "AllowedMethods": ["GET"],
>         "AllowedOrigins": ["*"],
>         "ExposeHeaders": []
>     }
> ]
> ```

## 2. Database Hosting (MongoDB Atlas)
Instead of running a database manually on EC2, using a managed service is highly recommended.
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free tier cluster.
2. In Network Access, whitelist your EC2 IP address or `0.0.0.0/0` (not recommended for production).
3. Retrieve your Connection String (URI).

## 3. Backend Deployment (AWS App Runner or EC2)

### Option A: AWS App Runner (Fastest & Simplest)
App Runner automatically builds and deploys your Node.js backend from a GitHub repo.
1. Push your code to GitHub.
2. In AWS Console, go to **App Runner** -> "Create service".
3. Select "Source code repository" and connect your GitHub.
4. Set Build command: `npm install`
5. Set Start command: `npm start`
6. Add the environment variable: `MONGO_URI = <Your Atlas Connection String>`.
7. Deploy. You'll get an API URL like `https://xxx.awsapprunner.com`.

### Option B: AWS EC2 (More Control)
1. Launch an Ubuntu EC2 instance. Ensure Security Groups allow HTTP (80) and SSH (22).
2. SSH into the instance and install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. Copy your backend files to the server.
4. Run `npm install` and use `pm2` to keep the app running in the background:
   ```bash
   sudo npm install -g pm2
   pm2 start server.js
   ```

## 4. Frontend Deployment (AWS Amplify or S3 Static Hosting)
Since Vite compiles to static HTML/JS/CSS files, we can host it easily.

### Option: S3 Static site + CloudFront
1. In your frontend directory, run `npm run build`. This generates a `dist` folder.
2. Create a new S3 bucket (e.g., `shadoweb-frontend`).
3. Enable "Static website hosting" in the bucket properties.
4. Upload the contents of the `dist` directory to this bucket.
5. In your frontend `.env` or configuration, ensure the `API_BASE` URL points to your App Runner or EC2 IP address instead of `localhost:5000`.
6. For HTTPS and CDN caching globally, create a **CloudFront** distribution pointing to the S3 Bucket domain.
