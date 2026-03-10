const mongoose = require('mongoose');
require('dotenv').config();
const College = require('./models/College');
const Test = require('./models/Test');
const User = require('./models/User');

const db = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/college-find';

mongoose.connect(db).then(async () => {
    console.log('MongoDB connected for seeding...');

    try {
        // Clear existing data
        await College.deleteMany();
        await Test.deleteMany();

        const colleges = [
            {
                name: 'IIT Bombay',
                location: 'India',
                city: 'Mumbai',
                ranking: 1,
                fees: 200000,
                placementPercentage: 98,
                eligibilityMarks: 75,
                courseOffered: ['engineering', 'science']
            },
            {
                name: 'Stanford University',
                location: 'abroad',
                city: 'Stanford',
                ranking: 2,
                fees: 4000000,
                placementPercentage: 99,
                eligibilityMarks: 90,
                courseOffered: ['engineering', 'management', 'science', 'arts']
            },
            {
                name: 'IIM Ahmedabad',
                location: 'india',
                city: 'Ahmedabad',
                ranking: 3,
                fees: 2500000,
                placementPercentage: 100,
                eligibilityMarks: 85,
                courseOffered: ['management']
            },
            {
                name: 'Delhi College of Engineering',
                location: 'india',
                city: 'New Delhi',
                ranking: 15,
                fees: 150000,
                placementPercentage: 92,
                eligibilityMarks: 80,
                courseOffered: ['engineering']
            },
            {
                name: 'Harvard Medical School',
                location: 'abroad',
                city: 'Boston',
                ranking: 1,
                fees: 5000000,
                placementPercentage: 100,
                eligibilityMarks: 95,
                courseOffered: ['medical']
            }
        ];

        const tests = [
            {
                question: "What is the synonym of 'Abundant'?",
                options: ["Scace", "Plentiful", "Rare", "Limited"],
                answer: "Plentiful"
            },
            {
                question: "If 5x + 3 = 18, what is x?",
                options: ["2", "3", "5", "10"],
                answer: "3"
            },
            {
                question: "Which pattern matches the sequence: 2, 4, 8, 16, ...",
                options: ["30", "32", "24", "48"],
                answer: "32"
            },
            {
                question: "Which of the following is not a programming language?",
                options: ["Python", "Java", "HTML", "C++"],
                answer: "HTML"
            },
            {
                question: "If a train travels 60 km/h, how long will it take to cover 150 km?",
                options: ["2 hours", "2.5 hours", "3 hours", "1.5 hours"],
                answer: "2.5 hours"
            }
        ];

        await College.insertMany(colleges);
        await Test.insertMany(tests);

        console.log('Seeding completed successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
});
