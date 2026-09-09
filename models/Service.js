import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: String,
  completion_date: String,
  company: String,
});

const projectSchema = new mongoose.Schema({
  name: String,
  date: String,
  description: String,
  github_link: String,
});

const skillSchema = new mongoose.Schema({
  name: String,
  range: Number,
});

const serviceSchema = new mongoose.Schema({
  content: String,
  courses: [courseSchema],
  projects: [projectSchema],
  skillset: [skillSchema],
  service_name: String,
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
