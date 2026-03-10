import mongoose from 'mongoose';

const savedCollegeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'College'
  }
}, {
  timestamps: true
});

// Ensure a user can only save a specific college once
savedCollegeSchema.index({ user: 1, college: 1 }, { unique: true });

const SavedCollege = mongoose.model('SavedCollege', savedCollegeSchema);
export default SavedCollege;
