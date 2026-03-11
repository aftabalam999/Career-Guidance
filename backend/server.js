import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import collegeRoutes from './routes/collegeRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import savedCollegeRoutes from './routes/savedCollegeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/saved', savedCollegeRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Career Guidance API is running...');
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
