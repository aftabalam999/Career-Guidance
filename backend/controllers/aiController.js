
import College from '../models/College.js';
import User from '../models/User.js';
import AptitudeQuestion from '../models/AptitudeQuestion.js';
import Result from '../models/Result.js';
import Scholarship from '../models/Scholarship.js';
import Settings from '../models/Settings.js';

// Initialize DeepSeek API Helper
const callDeepSeekAPI = async (prompt) => {
  if (!process.env.DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY is missing from env variables');
  }
  
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    let errorText = await response.text();
    try { errorText = JSON.parse(errorText).error.message; } catch (e) {}
    throw new Error(`DeepSeek API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

// @desc    Get AI College Recommendations
export const getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const profile = user.studentProfile || {};
    
    // Check if aptitude test is completed
    if (!profile.aptitudeScore || profile.aptitudeScore === 0) {
        return res.status(400).json({ message: "Please complete your Aptitude Test first to get personalized recommendations." });
    }

    // Fetch global settings for weights
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }

    // Fetch all top colleges to pass logic to AI
    const colleges = await College.find({}).limit(15).lean();
    if (colleges.length === 0) {
        return res.json({ recommendations: [], message: "No colleges available in database." });
    }

    const prompt = `
      As an expert AI Career Advisor, evaluate the following student profile:
      Marks: 10th(${profile.marks10 || 0}%) 12th(${profile.marks12 || 0}%)
      Budget: ${profile.budget || 'Not specified'}
      Interests: ${profile.interests || 'Not specified'}
      Location Preference: ${profile.preferredLocation || 'Any'}
      Aptitude Score: ${profile.aptitudeScore || 0}%

      Use the following evaluation weights:
      - Academic Performance: ${settings.academicWeight}%
      - Aptitude Score: ${settings.aptitudeWeight}%
      - Current Placement Trends: ${settings.placementWeight}%
      - Financial/Budget Fit: ${settings.budgetWeight}%

      Rank the following colleges out of 100 based on fit.
      Return ONLY a JSON array of objects with "id", "match", and "reason".
      Colleges: ${JSON.stringify(colleges.map(c => ({ id: c._id, name: c.name, location: c.location, fees: c.feesRange, type: c.collegeType })))}
    `;

    let output = await callDeepSeekAPI(prompt);
    
    // Clean output to find valid JSON
    const jsonMatch = output.match(/\[.*\]/s);
    if (!jsonMatch) {
       throw new Error("AI failed to return valid recommendation data.");
    }
    
    const aiRecs = JSON.parse(jsonMatch[0]);

    // Merge AI recommendations with full college data
    const recommendations = aiRecs.map(rec => {
      const collegeData = colleges.find(c => c._id.toString() === rec.id.toString());
      return { ...rec, college: collegeData };
    }).filter(r => r.college); 

    res.json({ recommendations });
  } catch (error) {
    console.error("AI Error:", error.message);
    if (error.message.includes('429') || error.message.includes('Resource has been exhausted')) {
      return res.status(429).json({ 
        message: "AI quota reached. Please wait a minute before trying again." 
      });
    }
    res.status(500).json({ message: error.message || "An error occurred while generating recommendations." });
  }
};

// @desc    Process natural language queries
export const aiChatQuery = async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `Answer this query briefly as a career advisor: "${message}"`;

    const output = await callDeepSeekAPI(prompt);
    res.json({ response: output });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Aptitude Test Questions
export const getTestQuestions = async (req, res) => {
  try {
    const questions = await AptitudeQuestion.aggregate([{ $sample: { size: 5 } }]);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit Aptitude Test
export const submitTest = async (req, res) => {
  try {
    const { answers } = req.body; 
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const questionIds = Object.keys(answers);
    const questions = await AptitudeQuestion.find({ _id: { $in: questionIds } });

    let correctCount = 0;
    const sectionStats = {
        'Quantitative': { correct: 0, total: 0 },
        'Logical Reasoning': { correct: 0, total: 0 },
        'Verbal': { correct: 0, total: 0 }
    };

    questions.forEach(q => {
      const isCorrect = q.correctAnswer === answers[q._id.toString()];
      if (isCorrect) correctCount++;
      
      const section = q.section || 'General';
      if (!sectionStats[section]) sectionStats[section] = { correct: 0, total: 0 };
      
      sectionStats[section].total++;
      if (isCorrect) sectionStats[section].correct++;
    });

    const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    
    let suitability = 'Developing Aptitude';
    if (score >= 80) suitability = 'High Technology Potential';
    else if (score >= 60) suitability = 'Management Potential';
    else if (score >= 40) suitability = 'Creative Potential';

    const result = new Result({
      user: user._id,
      scores: {
        quantitative: sectionStats['Quantitative']?.correct || 0,
        logicalReasoning: sectionStats['Logical Reasoning']?.correct || 0,
        verbal: sectionStats['Verbal']?.correct || 0
      },
      totalScore: score,
      careerSuitability: suitability
    });

    await result.save();

    // Ensure studentProfile exists
    if (!user.studentProfile) {
        user.studentProfile = {};
    }
    user.studentProfile.aptitudeScore = score;
    
    // Mark as modified if it's a nested object and didn't trigger change detection
    user.markModified('studentProfile');
    await user.save();

    res.json({ score, suitability, resultId: result._id });
  } catch (error) {
    console.error("Submit Test Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Scholarships
export const getScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find({});
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
