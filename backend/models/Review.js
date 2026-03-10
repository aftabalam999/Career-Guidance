import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  college: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'College'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
