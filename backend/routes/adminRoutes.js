import express from 'express';
import multer from 'multer';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getAdminStats,
  getAdminAnalytics,
  getAdminColleges,
  createCollege,
  updateCollege,
  deleteCollege,
  getAdminUsers,
  deleteUser,
  getAdminScholarships,
  createScholarship,
  deleteScholarship,
  getAdminQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
  getAdminReviews,
  deleteReview,
  updateScholarship,
  importColleges
} from '../controllers/adminController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Apply protection to all routes in this file
router.use(protect);
router.use(admin);

// Stats & Analytics
router.get('/stats', getAdminStats);
router.get('/analytics', getAdminAnalytics);

// College Management
router.route('/colleges')
  .get(getAdminColleges)
  .post(createCollege);

router.route('/colleges/:id')
  .put(updateCollege)
  .delete(deleteCollege);

// User Management
router.get('/users', getAdminUsers);
router.delete('/users/:id', deleteUser);

// Scholarships
router.route('/scholarships')
  .get(getAdminScholarships)
  .post(createScholarship);

router.route('/scholarships/:id')
  .put(updateScholarship)
  .delete(deleteScholarship);

// Questions
router.route('/questions')
  .get(getAdminQuestions)
  .post(createQuestion);

router.route('/questions/:id')
  .put(updateQuestion)
  .delete(deleteQuestion);

// Reviews
router.get('/reviews', getAdminReviews);
router.delete('/reviews/:id', deleteReview);

// Dataset Import
router.post('/import-colleges', upload.single('file'), importColleges);

export default router;
