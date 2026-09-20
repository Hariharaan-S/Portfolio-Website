import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = process.env.MONGO_DB_URI || "mongodb://localhost:27017/portfolio";

  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;
