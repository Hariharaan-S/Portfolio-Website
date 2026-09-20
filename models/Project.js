import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  project: { type: String, required: true, trim: true },
  project_id: { type: String, required: true, unique: true, trim: true },
  content: { type: String, required: true, trim: true },
  about: { type: String, required: true, trim: true },
  techstack: { type: String, required: true, trim: true },
  key_features: { type: String, required: true, trim: true },
  image: { type: String, trim: true },
  video: { type: String, trim: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;
