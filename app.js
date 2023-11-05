const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.connect("mongodb://localhost:27017/portfolio");
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

const Service = mongoose.model("Service", serviceSchema);

// async function myServices() {
//     const services= await Service.find({});
//     return services;
// }

const s1 = new Service({
  content: "Writing versatile and platform-independent code.\n Languages's strong community support and libraries enhance development.\n",
  courses: [
    {
      name: "2022 Complete Python Bootcamp From Zero to Hero in Python",
      completion_date: "Jan 2022",
      company: "Udemy",
    },
    {
      name: "Crash course on Python",
      completion_date: "Mar 2023",
      company: "Coursera",
    }
  ],
  projects: [],
  skillset: [{
    name: "Python",
    range: 80
  },
  {
    name: "Java",
    range: 78
  }
],
  service_name: "Competitive Coder",
})
// s1.save();

app.set("view engine", "ejs");
app.use(express.static("public"))
app.use('/services', express.static('public'));
app.use('/projects', express.static('public'));

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
  res.render("services.ejs", { name: ser_name, content: head_content, c_name: c_names, p_name: p_names,s_name: s_name })
})

app.listen(5000, function () {
  console.log("Server is running on port 5000");
})