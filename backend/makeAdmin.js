import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const makeAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        // Let's find all users to be sure
        const users = await User.find({});
        console.log('Found users:', users.map(u => ({ name: u.name, email: u.email, role: u.role })));
        
        // Find the user to promote
        const user = await User.findOne({ name: /Aftab/i });
        if (user) {
            user.role = 'admin';
            user.isVerified = true; // Also verify if not already
            await user.save();
            console.log(`Success! User ${user.name} (${user.email}) is now an Admin.`);
        } else {
            console.log('No user with name including "Aftab" found.');
        }
        
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

makeAdmin();
