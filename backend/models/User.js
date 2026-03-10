const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Student'], default: 'Student' },
    careerInterest: { type: String },
    locationPreference: { type: String },
    marks: { type: Number },
    budget: { type: Number },
    savedColleges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'College' }]
});

module.exports = mongoose.model('User', UserSchema);
