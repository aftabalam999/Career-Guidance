const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true }, // "India" or "Abroad"
    city: { type: String },
    ranking: { type: Number, required: true }, // 1 is best
    fees: { type: Number, required: true }, // in some currency or normalized
    placementPercentage: { type: Number, required: true }, // 0 to 100
    eligibilityMarks: { type: Number, required: true }, // e.g. 60%
    courseOffered: [{ type: String }], // e.g. Engineering, Management
    description: { type: String }
});

module.exports = mongoose.model('College', CollegeSchema);
