import SavedCollege from '../models/SavedCollege.js';
import College from '../models/College.js';

// @desc    Get all saved colleges for logged in user
// @route   GET /api/saved
// @access  Private
export const getSavedColleges = async (req, res) => {
  try {
    const savedColleges = await SavedCollege.find({ user: req.user._id })
      .populate('college');
    res.json(savedColleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save a college to favorites
// @route   POST /api/saved
// @access  Private
export const saveCollege = async (req, res) => {
  try {
    const { collegeId } = req.body;
    
    // Check if it exists
    const alreadySaved = await SavedCollege.findOne({ 
      user: req.user._id, 
      college: collegeId 
    });

    if (alreadySaved) {
      return res.status(400).json({ message: 'College already saved' });
    }

    const saved = await SavedCollege.create({
      user: req.user._id,
      college: collegeId
    });

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove saved college
// @route   DELETE /api/saved/:id
// @access  Private
export const removeSavedCollege = async (req, res) => {
  try {
    // Note: req.params.id is the ID of the SavedCollege document or the College document.
    // Let's assume it's the SavedCollege document ID, or we can find by collegeId.
    const saved = await SavedCollege.findOneAndDelete({ 
      user: req.user._id, 
      college: req.params.id 
    });

    if (saved) {
      res.json({ message: 'College removed from saved list' });
    } else {
      res.status(404).json({ message: 'Saved college not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
