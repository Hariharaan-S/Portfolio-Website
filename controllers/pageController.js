import Service from "../models/Service.js";
import Project from "../models/Project.js";

export const homePage = (req, res) => {
  res.render("index.ejs");
};

export const servicePage = async (req, res) => {
  const ser_name = req.params.name;

  try {
    const services = await Service.find({ service_name: ser_name });
    const service = services[0];

    if (!service) {
      return res.status(404).send("Service not found");
    }

    res.render("services.ejs", {
      name: ser_name,
      content: service.content,
      c_name: service.courses,
      p_name: service.projects,
      s_name: service.skillset,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while fetching service data");
  }
};

export const projectPage = async (req, res) => {
  let ser_name = req.params.name;
  const imageName = ser_name;

  if (ser_name === "Trash_Triage") {
    const temp = ser_name.split("_");
    ser_name = temp[0] + temp[1];
  }

  try {
    const projects = await Project.find({ project: ser_name });
    const project = projects[0];

    if (!project) {
      return res.status(404).send("Project not found");
    }

    const keyFeatures = project.key_features.split("\n");

    res.render("projects.ejs", {
      name: ser_name,
      image_name: imageName,
      content: project.content,
      about: project.about,
      techstack: project.techstack,
      key: keyFeatures,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while fetching project data");
  }
};
