import express from 'express';
import { getSavedColleges, saveCollege, removeSavedCollege } from '../controllers/savedCollegeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getSavedColleges)
  .post(protect, saveCollege);

router.delete('/:id', protect, removeSavedCollege);

export default router;
