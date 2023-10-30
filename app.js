const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static("public"))
app.use('/services', express.static('public'));
app.use('/projects', express.static('public'));

app.get("/", function (req, res) {
    res.render("index.ejs");
});

app.get("/services/:name", (req, res) => {
    const service_name = req.params.name;
    res.render("services.ejs", { name: service_name, about: "Hi, I am here to help you out. I'm currently in penultimate year at St. Joseph's College of Engineering with CGPA(as now) 9.28. I'm passionate in becoming a Full Stack Developer and did a handpick amount of projects. I, member of 'Unique Coders', am a Finalist in Smart India Hackathon held at 2022. I have completed training for", courses: ["C1","C2","C3"] , projects : ["P1","P2","P3"] })
})

app.listen(5000, function () {
    console.log("Server is running on port 5000");
})