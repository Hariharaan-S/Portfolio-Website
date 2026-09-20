import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  badge: { type: String, required: true, trim: true },
  organization: { type: String, required: true, trim: true },
  date: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Achievement = mongoose.model("Achievement", achievementSchema);

export default Achievement;