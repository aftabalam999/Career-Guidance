import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const user = await User.findOneAndUpdate(
      { email: "admin@test.org" },
      { role: "admin", isVerified: true },
      { new: true }
    );

    if (user) {
      console.log(`User ${user.email} is now an admin.`);
    } else {
      console.log("User not found.");
    }
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

makeAdmin();
