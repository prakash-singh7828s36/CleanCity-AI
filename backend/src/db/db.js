import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
      bufferCommands: false,
    });
    console.log("DB connected ✅");
  } catch (error) {
    console.log("DB error ❌", error.message);
  }
};

export default connectToDatabase;