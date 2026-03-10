import express from 'express';
import { getColleges, getCollegeById, createCollege } from '../controllers/collegeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getColleges)
  .post(protect, admin, createCollege);

router.route('/:id')
  .get(getCollegeById);

export default router;
