import mongoose from 'mongoose';
import dotenv from 'dotenv';
import College from './models/College.js';

dotenv.config();

const colleges = [
  {
    name: "Indian Institute of Technology Delhi",
    description: "Premier engineering and technology institution of India known for world-class research.",
    location: "New Delhi",
    collegeType: "Public",
    ranking: 1,
    placementPercentage: 98,
    feesRange: "₹2,00,000/year",
    courses: [
      { name: "Computer Science", seats: 110, fees: 200000 },
      { name: "Electrical Engineering", seats: 95, fees: 200000 },
      { name: "Mechanical Engineering", seats: 95, fees: 200000 }
    ],
    campusSize: "325 Acres",
    hostelAvailable: true
  },
  {
    name: "National Institute of Technology Trichy",
    description: "Top NIT known for exceptional placement records and academic excellence.",
    location: "Tiruchirappalli, Tamil Nadu",
    collegeType: "Public",
    ranking: 8,
    placementPercentage: 95,
    feesRange: "₹1,50,000/year",
    courses: [
      { name: "Computer Science", seats: 68, fees: 150000 },
      { name: "Civil Engineering", seats: 55, fees: 150000 }
    ],
    campusSize: "800 Acres",
    hostelAvailable: true
  },
  {
    name: "BITS Pilani",
    description: "Renowned private engineering institution famous for its industry connections and internship culture.",
    location: "Pilani, Rajasthan",
    collegeType: "Private",
    ranking: 5,
    placementPercentage: 97,
    feesRange: "₹5,00,000/year",
    courses: [
      { name: "Computer Science", seats: 120, fees: 500000 },
      { name: "Electronics", seats: 100, fees: 500000 }
    ],
    campusSize: "200 Acres",
    hostelAvailable: true
  },
  {
    name: "Delhi Technological University",
    description: "A state government university with excellent placement in core engineering and tech.",
    location: "New Delhi",
    collegeType: "Public",
    ranking: 15,
    placementPercentage: 88,
    feesRange: "₹80,000/year",
    courses: [
      { name: "Computer Science", seats: 180, fees: 80000 },
      { name: "Mechanical Engineering", seats: 120, fees: 80000 }
    ],
    campusSize: "164 Acres",
    hostelAvailable: true
  },
  {
    name: "VIT Vellore",
    description: "Private institute known for strong alumni network and diverse student culture across India.",
    location: "Vellore, Tamil Nadu",
    collegeType: "Private",
    ranking: 12,
    placementPercentage: 91,
    feesRange: "₹2,50,000/year",
    courses: [
      { name: "Computer Science", seats: 300, fees: 250000 },
      { name: "Information Technology", seats: 240, fees: 250000 }
    ],
    campusSize: "372 Acres",
    hostelAvailable: true
  },
  {
    name: "Jadavpur University",
    description: "One of India's top public universities with a strong focus on research and innovation.",
    location: "Kolkata, West Bengal",
    collegeType: "Public",
    ranking: 10,
    placementPercentage: 92,
    feesRange: "₹30,000/year",
    courses: [
      { name: "Computer Science", seats: 60, fees: 30000 },
      { name: "Electrical Engineering", seats: 75, fees: 30000 }
    ],
    campusSize: "100 Acres",
    hostelAvailable: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/career_guidance');
    await College.deleteMany({});
    const inserted = await College.insertMany(colleges);
    console.log(`✅ Seeded ${inserted.length} colleges successfully!`);
    console.log('College IDs:');
    inserted.forEach(c => console.log(`  ${c.name}: ${c._id}`));
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.connection.close();
  }
};

seedDB();
