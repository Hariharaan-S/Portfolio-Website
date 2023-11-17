const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
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

const projectSchema = new mongoose.Schema({
  project: String,
  content: String,
  about: String,
  techstack: String,
  key_features:String
});

const Project = new mongoose.model("Project",projectSchema);

const entry = new Project({
  project: "Boton AI",
  content: `A groundbreaking solution for detecting counterfeit medicinal raw materials, ensuring the safety and integrity of pharmaceutical supply chains.`,
  about: `Boton AI is a cutting-edge project focused on combating the global issue of counterfeit medicinal raw materials. Utilizing advanced artificial intelligence algorithms, Boton AI meticulously analyzes the composition of pharmaceutical raw materials to distinguish genuine substances from fake or substandard ones. The system is designed to enhance the safety and integrity of pharmaceutical supply chains by providing accurate and swift identification of potential threats.
  With a user-friendly interface, Boton AI empowers pharmaceutical professionals to validate the authenticity of raw materials, contributing to the overall quality assurance in the production of medications. By leveraging the power of AI, Boton AI stands as a crucial tool in the ongoing battle against counterfeit drugs, safeguarding public health and maintaining the trustworthiness of the pharmaceutical industry.`,
  techstack: `Front-End: HTML, CSS, and JavaScript, Back-End: Python, Machine Learning Model, Database: MySQL`,
  key_features: `AI-Based Authentication: 
  Boton AI employs advanced artificial intelligence algorithms to analyze and authenticate medicinal raw materials, ensuring accurate detection of counterfeit substances.

  Supply Chain Integrity: 
  Enhancing pharmaceutical supply chain security, Boton AI verifies the authenticity of raw materials, reducing the risk of counterfeit drugs entering the production process.
  
  Rapid Identification: 
  The system provides swift and real-time identification of potential counterfeit materials, allowing for immediate corrective action and preventing the distribution of substandard pharmaceuticals.
  
  User-Friendly Interface: 
  Boton AI features an intuitive interface, making it accessible for pharmaceutical professionals to easily integrate into their workflow for efficient material authentication.
  
  Data Analysis and Reporting: 
  The platform offers robust data analysis tools and reporting features, providing comprehensive insights into the prevalence of counterfeit materials and aiding in regulatory compliance.
  
  Continuous Learning: 
  Boton AI continuously learns from new data, adapting to evolving patterns of counterfeit materials to enhance its accuracy over time.
  
  Secure Data Handling: 
  Prioritizing data security, Boton AI ensures the confidentiality and integrity of sensitive information related to pharmaceutical raw materials.
  
  Integration Capabilities: 
  The system is designed for seamless integration with existing pharmaceutical production processes and quality control systems, minimizing disruptions in workflow.
  
  Customizable Alerts: 
  Boton AI can be configured to generate customizable alerts and notifications when potential counterfeit materials are detected, enabling proactive response measures.
  
  Compliance Assurance: 
  Boton AI supports pharmaceutical companies in meeting regulatory standards by providing a reliable tool for quality assurance and counterfeit detection, fostering trust in the industry.`
});
// entry.save();

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

app.get("/projects/:name",async(req,res) => {
  var ser_name = req.params.name;
  var t = ser_name;
  var new_name = "";
  if(ser_name === "Trash_Triage"){
    const temp = ser_name.split("_");
    new_name = temp[0]+temp[1];
    ser_name = new_name;
  }
  const projects = await Project.find({ project: ser_name });
  const content = projects[0].content;
  const about = projects[0].about;
  const techstack = projects[0].techstack;
  const key_features = projects[0].key_features;
  var temp_var = key_features.split("\n");
  res.render('projects.ejs',{name: ser_name,image_name: t,content: content, about:about, techstack: techstack, key: temp_var});
})

app.listen(5000, function () {
  console.log("Server is running on port 5000");
})