import bcrypt from "bcryptjs";
import Achievement from "../models/Achievement.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";

const redirectWithError = (res, error) => {
  res.redirect(`/admin?error=${encodeURIComponent(error.message || "Unable to save changes")}`);
};

const numberValue = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const textValue = (value) => String(value || "").trim();

let adminPasswordHashPromise;

const getAdminPasswordHash = () => {
  if (!adminPasswordHashPromise) {
    adminPasswordHashPromise = process.env.ADMIN_PASSWORD
      ? bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
      : Promise.resolve(null);
  }

  return adminPasswordHashPromise;
};

export const loginPage = (req, res) => {
  if (req.session?.isAdmin) {
    return res.redirect("/admin");
  }

  res.render("admin/login.ejs", { error: req.query.error || "" });
};

export const login = async (req, res) => {
  const username = textValue(req.body.username);
  const password = String(req.body.password || "");
  const configuredUsername = process.env.ADMIN_USERNAME;
  const passwordHash = await getAdminPasswordHash();

  if (!configuredUsername || !passwordHash) {
    return res.status(503).render("admin/login.ejs", {
      error: "Admin credentials are not configured on the server.",
    });
  }

  const validPassword = await bcrypt.compare(password, passwordHash);
  if (username !== configuredUsername || !validPassword) {
    return res.status(401).render("admin/login.ejs", {
      error: "Invalid username or password.",
    });
  }

  req.session.regenerate((error) => {
    if (error) {
      return res.status(500).render("admin/login.ejs", {
        error: "Unable to start an admin session.",
      });
    }

    req.session.isAdmin = true;
    req.session.adminUsername = username;
    res.redirect("/admin");
  });
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin/login");
  });
};

export const dashboard = async (req, res) => {
  const [skills, projects, achievements] = await Promise.all([
    Skill.find().sort({ order: 1, createdAt: 1 }),
    Project.find().sort({ order: 1, createdAt: 1 }),
    Achievement.find().sort({ order: 1, createdAt: 1 }),
  ]);

  res.render("admin/dashboard.ejs", {
    skills,
    projects,
    achievements,
    error: req.query.error || "",
  });
};

export const createSkill = async (req, res) => {
  try {
    await Skill.create({
      name: textValue(req.body.name),
      image: textValue(req.body.image),
      order: numberValue(req.body.order),
    });
    res.redirect("/admin");
  } catch (error) {
    redirectWithError(res, error);
  }
};

export const updateSkill = async (req, res) => {
  try {
    await Skill.findByIdAndUpdate(req.params.id, {
      name: textValue(req.body.name),
      image: textValue(req.body.image),
      order: numberValue(req.body.order),
    }, { runValidators: true });
    res.redirect("/admin");
  } catch (error) {
    redirectWithError(res, error);
  }
};

export const deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (error) {
    redirectWithError(res, error);
  }
};

export const createProject = async (req, res) => {
  try {
    await Project.create({
      project: textValue(req.body.project),
      project_id: textValue(req.body.project_id),
      content: textValue(req.body.content),
      about: textValue(req.body.about),
      techstack: textValue(req.body.techstack),
      key_features: textValue(req.body.key_features),
      image: textValue(req.body.image),
      video: textValue(req.body.video),
      order: numberValue(req.body.order),
    });
    res.redirect("/admin");
  } catch (error) {
    redirectWithError(res, error);
  }
};

export const updateProject = async (req, res) => {
  try {
    await Project.findByIdAndUpdate(req.params.id, {
      project: textValue(req.body.project),
      project_id: textValue(req.body.project_id),
      content: textValue(req.body.content),
      about: textValue(req.body.about),
      techstack: textValue(req.body.techstack),
      key_features: textValue(req.body.key_features),
      image: textValue(req.body.image),
      video: textValue(req.body.video),
      order: numberValue(req.body.order),
    }, { runValidators: true });
    res.redirect("/admin");
  } catch (error) {
    redirectWithError(res, error);
  }
};

export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (error) {
    redirectWithError(res, error);
  }
};

export const createAchievement = async (req, res) => {
  try {
    await Achievement.create({
      title: textValue(req.body.title),
      badge: textValue(req.body.badge),
      organization: textValue(req.body.organization),
      date: textValue(req.body.date),
      description: textValue(req.body.description),
      image: textValue(req.body.image),
      order: numberValue(req.body.order),
    });
    res.redirect("/admin");
  } catch (error) {
    redirectWithError(res, error);
  }
};

export const updateAchievement = async (req, res) => {
  try {
    await Achievement.findByIdAndUpdate(req.params.id, {
      title: textValue(req.body.title),
      badge: textValue(req.body.badge),
      organization: textValue(req.body.organization),
      date: textValue(req.body.date),
      description: textValue(req.body.description),
      image: textValue(req.body.image),
      order: numberValue(req.body.order),
    }, { runValidators: true });
    res.redirect("/admin");
  } catch (error) {
    redirectWithError(res, error);
  }
};

export const deleteAchievement = async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (error) {
    redirectWithError(res, error);
  }
};
