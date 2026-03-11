import College from '../models/College.js';

// @desc    Fetch all colleges
// @route   GET /api/colleges
// @access  Public
export const getColleges = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    // Filters Construction
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};

    const qCollegeType = req.query.collegeType ? { collegeType: req.query.collegeType } : {};
    const qLocation = req.query.location ? { location: { $regex: req.query.location, $options: 'i' } } : {};
    
    const count = await College.countDocuments({ ...keyword, ...qCollegeType, ...qLocation });
    
    const colleges = await College.find({ ...keyword, ...qCollegeType, ...qLocation })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ colleges, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single college
// @route   GET /api/colleges/:id
// @access  Public
export const getCollegeById = async (req, res) => {
  try {
    const college = await College.findByIdAndUpdate(
      req.params.id, 
      { $inc: { views: 1 } }, 
      { new: true }
    ).populate('reviews.user', 'name');

    if (college) {
      res.json(college);
    } else {
      res.status(404).json({ message: 'College not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a college
// @route   POST /api/colleges
// @access  Private/Admin
export const createCollege = async (req, res) => {
  try {
    const college = new College(req.body);
    const createdCollege = await college.save();
    res.status(201).json(createdCollege);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
