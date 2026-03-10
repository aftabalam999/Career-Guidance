const College = require('../models/College');

async function getRecommendations(user, aptitudeScore) {
    const colleges = await College.find();

    const userBudget = user.budget || 1000000;
    const userMarks = user.marks || 50;
    const userCourse = user.careerInterest ? user.careerInterest.toLowerCase() : '';
    const userLocation = user.locationPreference ? user.locationPreference.toLowerCase() : '';

    let scoredColleges = colleges.map(college => {
        let score = 0;
        let matchPercentage = 0;

        // Eligibility check
        if (userMarks < college.eligibilityMarks) {
            return null;
        }

        // 1. Course Match (20 points max)
        const courses = college.courseOffered.map(c => c.toLowerCase());
        if (userCourse && courses.includes(userCourse)) {
            score += 20;
        }

        // 2. Location Match (20 points max)
        if (userLocation && college.location.toLowerCase() === userLocation) {
            score += 20;
        }

        // 3. Affordability (20 points max)
        if (college.fees <= userBudget) {
            score += 20;
        } else {
            score += Math.max(0, 20 - ((college.fees - userBudget) / 50000));
        }

        // 4. Ranking Weight (20 points max)
        // Assume ranking 1 is best.
        const rankingScore = Math.max(0, 20 - (college.ranking / 10));
        score += rankingScore;

        // 5. Placement Weight (20 points max)
        const placementScore = (college.placementPercentage / 100) * 20;
        score += placementScore;

        // Base score is out of 100. Let's add Aptitude Bonus or normalize it.
        matchPercentage = Math.min(100, Math.round(score + (aptitudeScore / 10)));

        return {
            college: college._id,
            matchPercentage,
            collegeData: college
        };
    });

    scoredColleges = scoredColleges.filter(item => item !== null);
    scoredColleges.sort((a, b) => b.matchPercentage - a.matchPercentage);

    return scoredColleges.slice(0, 10);
}

module.exports = { getRecommendations };
