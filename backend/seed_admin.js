import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/career_guidance');

    const adminExists = await User.findOne({ email: 'admin@test.com' });
    if (adminExists) {
        await User.deleteOne({ email: 'admin@test.com' });
    }

    const admin = new User({
      name: 'Platform Admin',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin',
      isVerified: true
    });

    await admin.save();
    console.log('✅ Admin user created: admin@test.com / password123');

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

createAdmin();
