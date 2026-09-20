import Service from "../models/Service.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Achievement from "../models/Achievement.js";

export const homePage = async (req, res) => {
  const [skills, projects, achievements] = await Promise.all([
    Skill.find().sort({ order: 1, createdAt: 1 }),
    Project.find().sort({ order: 1, createdAt: 1 }),
    Achievement.find().sort({ order: 1, createdAt: 1 }),
  ]);

  res.render("index.ejs", { skills, projects, achievements });
};

export const notFoundPage = (req, res) => {
  res.status(404).render("404.ejs");
};

export const servicePage = async (req, res) => {
  const ser_name = req.params.name;

  try {
    const services = await Service.find({ service_name: ser_name });
    const service = services[0];

    if (!service) {
      return notFoundPage(req, res);
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
  const { project_id } = req.params;

  try {
    const project = await Project.findOne({ project_id });

    if (!project) {
      return notFoundPage(req, res);
    }

    const keyFeatures = (project.key_features || "").split("\n").filter(Boolean);

    res.render("projects.ejs", {
      name: project.project,
      image_name: project.image || project_id,
      content: project.content,
      about: project.about,
      techstack: project.techstack,
      key: keyFeatures,
      video_name: project.video || project.project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while fetching project data");
  }
};
