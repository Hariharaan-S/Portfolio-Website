const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.connect("mongodb://localhost:27017/portfolio");
const serviceSchema = new mongoose.Schema({
    service: String,
    service_about: String
});

const Service = mongoose.model("about",serviceSchema);
// const s1 = new Service({
//     service: "Web Development",
//     service_about: "Lovely one!"
// });
// s1.save();

// async function myServices() {
//     const services= await Service.find({});
//     return services;
// }

app.set("view engine", "ejs");
app.use(express.static("public"))
app.use('/services', express.static('public'));
app.use('/projects', express.static('public'));

app.get("/", function (req, res) {
   res.render("index.ejs");
});

app.get("/services/:name", async (req, res) => {
    const service_name = req.params.name;
    const services= await Service.find({service: service_name});
    const service_name_send = services[0].service;
    const tServices = services[0].service_about;
    const temp = tServices.split("\\n");
    const service_about_send = temp.join(" ");
    res.render("services.ejs", { name: service_name_send, about: service_about_send})
})

app.listen(5000, function () {
    console.log("Server is running on port 5000");
})