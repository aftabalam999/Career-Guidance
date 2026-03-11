import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  collegeType: { type: String, enum: ['Public', 'Private'], required: true },
  ranking: { type: Number },
  placementPercentage: { type: Number },
  feesRange: { type: String },
  courses: [{
    name: String,
    seats: Number,
    fees: Number
  }],
  campusSize: { type: String },
  hostelAvailable: { type: Boolean, default: false },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true },
    comment: String
  }],
  views: { type: Number, default: 0 }
}, {
  timestamps: true
});

const College = mongoose.model('College', collegeSchema);
export default College;
