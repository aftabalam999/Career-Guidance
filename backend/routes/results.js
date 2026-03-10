const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { getRecommendations } = require('../services/recommendationEngine');

// @route   POST api/results
// @desc    Submit test score and get recommendations
router.post('/', auth, async (req, res) => {
    const { aptitudeScore } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const topColleges = await getRecommendations(user, aptitudeScore);

        const recommendedColleges = topColleges.map(c => ({
            college: c.college,
            matchPercentage: c.matchPercentage
        }));

        const result = new Result({
            studentId: req.user.id,
            aptitudeScore,
            recommendedColleges
        });

        await result.save();

        res.json({ result: await result.populate('recommendedColleges.college'), topColleges });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/results
// @desc    Get user's past results
router.get('/', auth, async (req, res) => {
    try {
        const results = await Result.find({ studentId: req.user.id })
            .populate('recommendedColleges.college')
            .sort({ date: -1 });
        res.json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
