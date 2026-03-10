import mongoose from 'mongoose';

const aptitudeQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  section: {
    type: String,
    enum: ['Quantitative', 'Logical Reasoning', 'Verbal'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  }
}, {
  timestamps: true
});

const AptitudeQuestion = mongoose.model('AptitudeQuestion', aptitudeQuestionSchema);
export default AptitudeQuestion;
