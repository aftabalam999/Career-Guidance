import { GoogleGenerativeAI } from '@google/generative-ai';
import College from '../models/College.js';
import User from '../models/User.js';

// Initialize Gemini API
const getGenAI = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing from env variables');
  }
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};

// @desc    Get AI College Recommendations
// @route   POST /api/ai/recommend
// @access  Private
export const getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const profile = user.studentProfile || {};
    
    // Fetch all top colleges (or limit, depending on implementation) to pass logic to AI or filter manually
    // We'll limit to 10 for AI to rank them based on prompt size
    const colleges = await College.find({}).limit(10).lean();

    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      As an expert AI Career Advisor, evaluate the following student profile:
      Marks: 10th(${profile.marks10}%) 12th(${profile.marks12}%)
      Budget: ${profile.budget}
      Interests: ${profile.interests}
      Location Preference: ${profile.preferredLocation}
      Aptitude Score: ${profile.aptitudeScore}%

      Rank the following top colleges out of 100 based on fit, returning a formatted JSON array containing the college ID, match percentage (0-100 integer), and a short 1 sentence reason.
      Colleges Data: ${JSON.stringify(colleges.map(c => ({ id: c._id, name: c.name, location: c.location, fees: c.feesRange, type: c.collegeType })))}

      ONLY RETURN A VALID JSON ARRAY. No markdown wrapping.
      Example: [{"id": "123", "match": 95, "reason": "Perfect fit"}]
    `;

    const result = await model.generateContent(prompt);
    let output = result.response.text();
    
    // Clean potential markdown blocks
    output = output.replace(/```json/g, '').replace(/```/g, '').trim();

    const recommendations = JSON.parse(output);

    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ message: error.message, advice: "Ensure GEMINI_API_KEY is configured." });
  }
};

// @desc    Process natural language queries to DB
// @route   POST /api/ai/chat
// @access  Private
export const aiChatQuery = async (req, res) => {
  try {
    const { message } = req.body;
    
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are CareerPath AI, a friendly conversational career advisor. 
      Student asked: "${message}"
      
      Provide a brief, helpful answer. E.g., if they ask what college they can get with 85%, tell them generalizations about good engineering or medical colleges and tell them to check the Explorer page. Keep the response to 2 paragraphs maximum.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ response: text });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
