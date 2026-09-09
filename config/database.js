import mongoose from "mongoose";

const isDevelopment = true;

const connectDB = async () => {
  const mongoURI = isDevelopment
    ? "mongodb://localhost:27017/portfolio"
    : process.env.MONGO_DB_PROD_CLIENT;

  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;
