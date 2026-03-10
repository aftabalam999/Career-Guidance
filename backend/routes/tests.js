const express = require('express');
const router = express.Router();
const Test = require('../models/Test');
const auth = require('../middleware/auth');

// @route   GET api/tests
// @desc    Get all test questions
router.get('/', auth, async (req, res) => {
    try {
        const tests = await Test.find();
        res.json(tests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/tests
// @desc    Add a test question
// @access  Admin
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ msg: 'Authorization denied, Admin only' });
    }
    const { question, options, answer } = req.body;
    try {
        const newTest = new Test({ question, options, answer });
        const test = await newTest.save();
        res.json(test);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
