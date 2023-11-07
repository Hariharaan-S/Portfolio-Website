const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
var nodemailer = require('nodemailer');
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

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  message: String
});

app.set("view engine", "ejs");
app.use(express.static("public"))
app.use('/services', express.static('public'));
app.use('/projects', express.static('public'));
const Service = mongoose.model("Service", serviceSchema);
const Contact = mongoose.model("Contact",contactSchema);

////////////////////////////// SENDING MAIL /////////////////////////////////////////
app.get("/send",(req,res) =>{
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

  res.send("true");
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
  res.render("services.ejs", { name: ser_name, content: head_content, c_name: c_names, p_name: p_names,s_name: s_name })
})

app.listen(5000, function () {
  console.log("Server is running on port 5000");
})