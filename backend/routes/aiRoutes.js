import express from 'express';
import { getRecommendations, aiChatQuery, getTestQuestions, submitTest, getScholarships } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/recommend', protect, getRecommendations);
router.post('/chat', protect, aiChatQuery);
router.get('/test-questions', protect, getTestQuestions);
router.post('/submit-test', protect, submitTest);
router.get('/scholarships', protect, getScholarships);

export default router;
