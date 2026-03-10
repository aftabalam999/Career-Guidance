const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    aptitudeScore: { type: Number, required: true },
    recommendedColleges: [{
        college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
        matchPercentage: { type: Number }
    }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', ResultSchema);
