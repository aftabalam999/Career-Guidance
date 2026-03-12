import mongoose from 'mongoose';
import AptitudeQuestion from './models/AptitudeQuestion.js';
import Scholarship from './models/Scholarship.js';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/career_guidance');

    // Seed Aptitude Questions
    await AptitudeQuestion.deleteMany();
    const questions = [
      {
        question: "If a car travels 300 miles in 5 hours, what is its average speed?",
        options: ["50 mph", "60 mph", "70 mph", "80 mph"],
        correctAnswer: "60 mph",
        section: "Quantitative"
      },
      {
        question: "Which number comes next in the sequence: 2, 6, 12, 20, 30, ...?",
        options: ["36", "40", "42", "48"],
        correctAnswer: "42",
        section: "Logical Reasoning"
      },
      {
        question: "Select the synonym for 'Eloquent'.",
        options: ["Silent", "Articulate", "Confused", "Fast"],
        correctAnswer: "Articulate",
        section: "Verbal"
      },
      {
        question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies.",
        options: ["True", "False"],
        correctAnswer: "True",
        section: "Logical Reasoning"
      },
      {
        question: "What is 15% of 200?",
        options: ["20", "25", "30", "35"],
        correctAnswer: "30",
        section: "Quantitative"
      }
    ];
    await AptitudeQuestion.insertMany(questions);
    console.log('✅ Seeded Aptitude Questions');

    // Seed Scholarships
    await Scholarship.deleteMany();
    const scholarships = [
      {
        name: "Merit-Cum-Means Scholarship",
        description: "For students with high academic performance and low family income.",
        amount: "50000",
        eligibility: {
          marksRequired: 85,
          incomeLimit: 500000
        },
        deadline: new Date("2026-12-31"),
        applyLink: "https://scholarships.gov.in"
      },
      {
        name: "Tech Innovators Grant",
        description: "Focuses on students pursuing Computer Science and AI.",
        amount: "100000",
        eligibility: {
          marksRequired: 75
        },
        deadline: new Date("2026-08-15"),
        applyLink: "https://google.com/scholarships"
      }
    ];
    await Scholarship.insertMany(scholarships);
    console.log('✅ Seeded Scholarships');

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

seedData();
