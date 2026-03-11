import mongoose from 'mongoose';
import Notification from './models/Notification.js';
import dotenv from 'dotenv';

dotenv.config();

const seedNotifications = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/career_guidance');
    const userId = '69b0dfa5105f82bad0ff7e4b'; // aftab@test.com
    
    await Notification.deleteMany({ user: userId });
    
    await Notification.insertMany([
      { 
        user: userId, 
        type: 'system', 
        message: 'Welcome to the Admin Panel! Explore student analytics and manage college listings.' 
      },
      { 
        user: userId, 
        type: 'new_college', 
        message: 'New college data imported successfully: 15 institutes added.' 
      },
      { 
        user: userId, 
        type: 'system', 
        message: 'Platform security update: All admin logins now require session validation.' 
      }
    ]);
    
    console.log('✅ Seeded 3 notifications for admin');
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.connection.close();
  }
};

seedNotifications();
