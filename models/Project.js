import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  project: String,
  content: String,
  about: String,
  techstack: String,
  key_features: String,
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
