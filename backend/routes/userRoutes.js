import express from 'express';
import { getUserProfile, updateUserProfile, getDashboardStats } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile);

router.get('/dashboard-stats', getDashboardStats);

export default router;
