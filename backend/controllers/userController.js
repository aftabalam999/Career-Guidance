import User from '../models/User.js';
import SavedCollege from '../models/SavedCollege.js';
import Result from '../models/Result.js';
import College from '../models/College.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentProfile: user.studentProfile || {}
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile & preferences
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // Basic info
      user.name = req.body.name || user.name;
      
      // Update nested student profile
      if (req.body.studentProfile) {
        user.studentProfile = Object.assign(
          user.studentProfile || {}, 
          req.body.studentProfile
        );
      }

      if (req.body.password) {
        user.password = req.body.password; // Pre-save hook hashes it
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        studentProfile: updatedUser.studentProfile
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard stats for student
// @route   GET /api/users/dashboard-stats
// @access  Private
export const getDashboardStats = async (req, res) => {
  try {
    const savedCount = await SavedCollege.countDocuments({ user: req.user._id });
    const tests = await Result.find({ user: req.user._id }).sort({ createdAt: -1 });
    const collegesCount = await College.countDocuments();
    
    const user = await User.findById(req.user._id);
    const aptitudeScore = user.studentProfile?.aptitudeScore || 0;

    res.json({
      savedCount,
      recentActivity: tests.map(t => ({
        title: `Completed Aptitude Test`,
        subtitle: t.careerSuitability,
        date: t.createdAt,
        score: t.totalScore
      })),
      aptitudeScore,
      collegesCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
