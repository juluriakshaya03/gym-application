

import app from './app';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

console.log('🌱 Loading env...');
dotenv.config();

console.log('🌍 Connecting to DB...');
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB(); // hangs here if MongoDB is unreachable
  console.log('🚀 Starting server...');
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
};

startServer();