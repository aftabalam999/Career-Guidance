import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createAftabAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        const email = 'aftab@test.com'; // You can change this to your desired email
        const password = 'password123'; // Default password for now
        
        // Check if user exists
        let user = await User.findOne({ email });
        
        if (user) {
            user.role = 'admin';
            user.isVerified = true;
            await user.save();
            console.log(`Success! Existing user ${user.name} (${user.email}) is now an Admin.`);
        } else {
            // Create new admin user
            user = await User.create({
                name: 'Aftab Alam',
                email: email,
                password: password, // Will be hashed by pre-save hook
                role: 'admin',
                isVerified: true
            });
            console.log(`Success! New admin user created:`);
            console.log(`Email: ${email}`);
            console.log(`Password: ${password}`);
            console.log(`Role: admin`);
        }
        
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

createAftabAdmin();
