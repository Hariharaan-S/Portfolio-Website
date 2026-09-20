import dotenv from "dotenv";
import connectDB from "../config/database.js";
import Achievement from "../models/Achievement.js";
import Skill from "../models/Skill.js";

dotenv.config();

const skills = [
  ["HTML5", "HTML5.svg"], ["CSS3", "CSS3.svg"], ["JavaScript", "JavaScript.svg"],
  ["React", "React.svg"], ["Node.js", "Node.js.svg"], ["MongoDB", "MongoDB.svg"],
  ["Python", "Python.svg"], ["Git", "Git.svg"], ["AWS", "AWS.svg"],
  ["Docker", "Docker.svg"], ["Express", "Express.svg"], ["Flask", "Flask.svg"],
  ["GitHub", "Github.svg"], ["Java", "Java.svg"], ["jQuery", "jQuery.svg"],
  ["Kubernetes", "Kubernetes.svg"], ["MySQL", "MySQL.svg"],
];

const achievements = [
  {
    title: "Smart India Hackathon - 2024",
    badge: "Finalist",
    organization: "Gujarat Government",
    date: "December 2024",
    description: "Selected as a finalist in Smart India Hackathon 2024, recognizing innovative problem-solving and technical capabilities.",
    image: "SIH 2024.jpg",
    order: 0,
  },
  {
    title: "CyberX Hackathon - 2023",
    badge: "Finalist",
    organization: "Greater Chennai Police & VIT Chennai",
    date: "May 2023",
    description: "Reached the finals of the CyberX Hackathon, demonstrating technical skills and innovative thinking in a competitive environment.",
    image: "cyberx.jpeg",
    order: 1,
  },
  {
    title: "Smart India Hackathon - 2022",
    badge: "Finalist",
    organization: "Ministry of Education, India",
    date: "August 2022",
    description: "Achieved finalist status in Smart India Hackathon 2022, showcasing strong technical problem-solving and innovation at a national level.",
    image: "SIH 2022.avif",
    order: 2,
  },
];

await connectDB();

for (const [index, [name, image]] of skills.entries()) {
  await Skill.updateOne({ name }, { $setOnInsert: { name, image, order: index } }, { upsert: true });
}

for (const achievement of achievements) {
  await Achievement.updateOne(
    { title: achievement.title },
    { $setOnInsert: achievement },
    { upsert: true },
  );
}

console.log("Initial skills and achievements seeded.");
process.exit(0);