import College from '../models/College.js';
import User from '../models/User.js';
import Scholarship from '../models/Scholarship.js';
import Result from '../models/Result.js';
import AptitudeQuestion from '../models/AptitudeQuestion.js';
import Review from '../models/Review.js';
import Notification from '../models/Notification.js';
import Settings from '../models/Settings.js';
import fs from 'fs';
import csv from 'csv-parser';

// Dashboard Stats
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'student' });
    const totalColleges = await College.countDocuments();
    const testsCompleted = await Result.countDocuments();
    const activeScholarships = await Scholarship.countDocuments({
      deadline: { $gte: new Date() }
    });

    res.json({
      totalUsers,
      totalColleges,
      testsCompleted,
      activeScholarships
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Analytics Data
export const getAdminAnalytics = async (req, res) => {
  try {
    // User registrations per month (last 6 months)
    const userGrowth = await User.aggregate([
      {
        $match: {
          role: 'student',
          createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Most viewed colleges
    const mostViewedColleges = await College.find({})
      .sort({ views: -1 })
      .limit(5)
      .select('name views');

    // Career preference distribution
    const careerPrefs = await User.aggregate([
      { $match: { "studentProfile.preferredCourse": { $exists: true, $ne: "" } } },
      { $group: { _id: "$studentProfile.preferredCourse", count: { $sum: 1 } } },
      { $limit: 5 }
    ]);

    // Aptitude score distribution
    const scoreDistribution = await Result.aggregate([
      {
        $bucket: {
          groupBy: "$totalScore",
          boundaries: [0, 20, 40, 60, 80, 101],
          default: "Other",
          output: { count: { $sum: 1 } }
        }
      }
    ]);

    res.json({
      userGrowth,
      mostViewedColleges,
      careerPrefs,
      scoreDistribution
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// College Management
export const getAdminColleges = async (req, res) => {
  try {
    const colleges = await College.find({}).sort({ createdAt: -1 });
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCollege = async (req, res) => {
  try {
    const college = new College(req.body);
    const savedCollege = await college.save();
    
    // Notify all students (simplified for this demo)
    const students = await User.find({ role: 'student' });
    const notifications = students.map(student => ({
      user: student._id,
      type: 'new_college',
      message: `A new institute "${savedCollege.name}" has been added in ${savedCollege.location}. Check it out!`
    }));
    
    await Notification.insertMany(notifications);
    
    res.status(201).json(savedCollege);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCollege = async (req, res) => {
  try {
    const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!college) return res.status(404).json({ message: 'College not found' });
    res.json(college);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCollege = async (req, res) => {
  try {
    const college = await College.findByIdAndDelete(req.params.id);
    if (!college) return res.status(404).json({ message: 'College not found' });
    res.json({ message: 'College removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Management
export const getAdminUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'student' }).sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Scholarship Management
export const getAdminScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find({}).sort({ createdAt: -1 });
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createScholarship = async (req, res) => {
  try {
    const scholarship = new Scholarship(req.body);
    await scholarship.save();
    res.status(201).json(scholarship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteScholarship = async (req, res) => {
  try {
    await Scholarship.findByIdAndDelete(req.params.id);
    res.json({ message: 'Scholarship removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(scholarship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Aptitude Test Questions Management
export const getAdminQuestions = async (req, res) => {
  try {
    const questions = await AptitudeQuestion.find({}).sort({ section: 1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const question = new AptitudeQuestion(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    await AptitudeQuestion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const question = await AptitudeQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// CSV Dataset Import
export const importColleges = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a CSV file' });
  }

  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        // Simple mapping from CSV headers to schema
        const mappedColleges = results.map(row => ({
          name: row.name,
          location: row.location,
          collegeType: row.collegeType || 'Private',
          feesRange: row.fees,
          placementPercentage: parseInt(row.placement) || 0,
          ranking: parseInt(row.ranking) || 0
        }));

        await College.insertMany(mappedColleges);
        fs.unlinkSync(req.file.path); // Remove temp file
        res.json({ message: `${mappedColleges.length} colleges imported successfully` });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
};

// Review Moderation
export const getAdminReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate('user', 'name email')
      .populate('college', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Settings Management
export const getAdminSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAdminSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

