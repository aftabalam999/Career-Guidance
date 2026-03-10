import mongoose from 'mongoose';

const scholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  amount: { type: String, required: true },
  eligibility: {
    marksRequired: { type: Number },
    incomeLimit: { type: Number },
    category: [{ type: String }],
    state: { type: String }
  },
  deadline: { type: Date, required: true },
  applyLink: { type: String, required: true }
}, {
  timestamps: true
});

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);
export default Scholarship;
