import express from "express";
import 'dotenv/config';
const app = express();
import { mongoose } from "mongoose";
import bodyParser from "body-parser"
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_DB_CLIENT || "mongodb+srv://shariharaan2003:uhcr28rkv64ygUYW@portfolio.b2p6ba0.mongodb.net/portfolio");
import { LeetCode } from "leetcode-query";

const course = new mongoose.Schema({
  name: String,
  completion_date: String,
  company: String
});

const project = new mongoose.Schema({
  name: String,
  date: String,
  description: String,
  github_link: String
});

const skill = new mongoose.Schema({
  name: String,
  range: Number
});

const serviceSchema = new mongoose.Schema({
  content: String,
  courses: [course],
  projects: [project],
  skillset: [skill],
  service_name: String
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  message: String
});

const projectSchema = new mongoose.Schema({
  project: String,
  content: String,
  about: String,
  techstack: String,
  key_features: String
});


app.set("view engine", "ejs");
app.use(express.static("public"))
app.use('/services', express.static('public'));
app.use('/projects', express.static('public'));
const Service = mongoose.model("Service", serviceSchema);
const Contact = mongoose.model("Contact", contactSchema);
const Project = new mongoose.model("Project", projectSchema);

// const new_project = new Project({
//   project: "TaskFlow - A Task Management App",
//   content: "a user-friendly task management app allowing users to effortlessly create, edit, and delete tasks, thus enhancing productivity by eliminating distractions.",
//   about: "TaskFlow is a minimalist task management application developed to provide a simple yet powerful tool for organizing and managing tasks. The application is designed with a focus on usability and efficiency, ensuring that users can quickly add, modify, and remove tasks with ease. Whether you need to manage personal to-dos, work-related tasks, or any other type of task, TaskFlow provides a clutter-free interface that makes task management straightforward and effective.",
//   techstack: "MongoDB: For the database, storing task details and user information. Express.js: As the server-side framework, handling API requests and responses. React: For the front-end, creating an interactive and responsive user interface. Node.js: As the runtime environment, allowing server-side JavaScript execution.",
//   key_features: "Task Creation:\n Easily add new tasks with a simple and intuitive interface.\n Task Editing:\n Modify existing tasks to update their details and status.\n Task Deletion:\n Remove tasks that are no longer needed to keep your task list organized.\n Minimalist Design:\n Focus on your tasks with a clean and distraction-free user interface.\n Real-time Updates:\n Changes to tasks are reflected in real-time, ensuring your task list is always up to date.\n Responsive Design:\n Access TaskFlow from any device, with a design that adapts to different screen sizes\n. User Authentication:\n Secure login and registration system to protect user data and ensure privacy.\n Filter and Search:\n Quickly find tasks using filtering and search functionalities."
// })

// new_project.save();

////////////////////////////// SENDING MAIL /////////////////////////////////////////
app.get("/send", (req, res) => {
  const name = req.query.name;
  const email = req.query.email;
  const phone = req.query.phone;
  const message = req.query.message;
  const obj = new Contact({
    name: name,
    email: email,
    phone: phone,
    message: message
  });
  obj.save();

  res.status(200).json({ message: 'ok' });
})

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.get("/services/:name", async (req, res) => {
  const ser_name = req.params.name;
  const services = await Service.find({ service_name: ser_name });
  var head_content = services[0].content;
  var c_names = services[0].courses;
  var p_names = services[0].projects;
  var s_name = services[0].skillset;

  // const leetcode = new LeetCode();
  // const user = await leetcode.user("Hariharaan-S");

  // const username = user.matchedUser.username;
  // const submintCount = user.matchedUser.submitStats.acSubmissionNum;
  // const easy = submintCount[1].count;
  // const med = submintCount[2].count;
  // const hd = submintCount[3].count;
  // const recentSub = user.recentSubmissionList;


  //should be in render method: { name: ser_name, content: head_content, c_name: c_names, p_name: p_names, s_name: s_name, lUsername: username, easy: easy, med: med, hd: hd, lRecent: recentSub || null }
  res.render("services.ejs", { name: ser_name, content: head_content, c_name: c_names, p_name: p_names, s_name: s_name })
});

app.get("/projects/:name", async (req, res) => {
  var ser_name = req.params.name;
  var t = ser_name;
  var new_name = "";
  if (ser_name === "Trash_Triage") {
    const temp = ser_name.split("_");
    new_name = temp[0] + temp[1];
    ser_name = new_name;
  }
  const projects = await Project.find({ project: ser_name });
  const content = projects[0].content;
  const about = projects[0].about;
  const techstack = projects[0].techstack;
  const key_features = projects[0].key_features;
  var temp_var = key_features.split("\n");
  res.render('projects.ejs', { name: ser_name, image_name: t, content: content, about: about, techstack: techstack, key: temp_var });
})

const port = 5000 || process.env.PORT;

app.listen(port, function () {
  console.log('Server is running at port ' + port);
})