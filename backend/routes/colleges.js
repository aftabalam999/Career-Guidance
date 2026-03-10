const express = require('express');
const router = express.Router();
const College = require('../models/College');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET api/colleges
// @desc    Get all colleges
router.get('/', async (req, res) => {
    try {
        const colleges = await College.find();
        res.json(colleges);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/colleges
// @desc    Add a new college
// @access  Admin
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ msg: 'Authorization denied, Admin only' });
    }
    try {
        const newCollege = new College(req.body);
        const college = await newCollege.save();
        res.json(college);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/colleges/saved/:id
// @desc    Save a college for a user
router.post('/saved/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.savedColleges.includes(req.params.id)) {
            return res.status(400).json({ msg: 'College already saved' });
        }
        user.savedColleges.unshift(req.params.id);
        await user.save();
        res.json(user.savedColleges);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/colleges/saved/:id
// @desc    Remove saved college
router.delete('/saved/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.savedColleges = user.savedColleges.filter(
            (collegeId) => collegeId.toString() !== req.params.id
        );
        await user.save();
        res.json(user.savedColleges);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
