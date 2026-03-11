import express from 'express';
import { 
  getNotifications, 
  markAsRead, 
  deleteNotification 
} from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getNotifications);

router.route('/:id')
  .put(protect, markAsRead)
  .delete(protect, deleteNotification);

export default router;
