import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  scores: {
    quantitative: { type: Number, default: 0 },
    logicalReasoning: { type: Number, default: 0 },
    verbal: { type: Number, default: 0 }
  },
  totalScore: {
    type: Number,
    required: true
  },
  careerSuitability: {
    type: String
  }
}, {
  timestamps: true
});

const Result = mongoose.model('Result', resultSchema);
export default Result;
