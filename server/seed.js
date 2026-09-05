import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Project } from './models/Project.js';
import { Achievement } from './models/Achievement.js';
import { Education } from './models/Education.js';

dotenv.config();

const projects = [
  {
    title: "Visit Sri Lanka",
    tagline: "React-based tourism website with modular components",
    category: "Web Projects",
    shortDesc: "React-based tourism website with modular components, responsive layouts, and structured destination-focused content presentation.",
    concept: "Visit Sri Lanka is a digital tourism promotion platform designed to showcase destinations, culture, and experiences across Sri Lanka.",
    image: "VisitSL.png",
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    liveUrl: "https://www.linkedin.com/posts/hiruni-sethmini_react-javascript-frontenddevelopment-activity-7258187842411991041-b1R7",
    githubUrl: "https://github.com/HiruniYasoda/Visit_Sri_Lanka_1"
  },
  {
    title: "VeloresQ",
    tagline: "Garage booking & emergency vehicle support system",
    category: "Web Projects",
    shortDesc: "Frontend prototype demonstrating garage booking, emergency services, and admin workflows using structured React-based UI.",
    concept: "VeloresQ is a garage booking and emergency vehicle support web application prototype.",
    image: "VeloresQ.png",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://www.linkedin.com/posts/jithmi-wickramasinghe_ideaigniters-frontendprototype-webdevelopment-ugcPost-7359559154409041920-lX9Y",
    githubUrl: "https://github.com/Jithmi25/veloresq-frontend"
  }
];

const achievements = [
  {
    rank: "1st Runners Up",
    title: "SHECODERess V6.0",
    description: "The hack and design showdown.",
    organization: "IEEE (WIE) Student Branch affinity group, Uwa Wellassa University Sri Lanka",
    image: "she.png",
    stars: 5
  },
  {
    rank: "4th Place",
    title: "AlgoArena",
    description: "Inter-university coding competition.",
    organization: "IEEE Student Branch and Computer Society Chapter, University of Sri Jayewardenepura",
    image: "algoarenalogo.webp",
    stars: 4
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas for seeding');

    await Project.deleteMany({});
    await Achievement.deleteMany({});

    await Project.insertMany(projects);
    await Achievement.insertMany(achievements);

    console.log('🎉 Successfully seeded MongoDB Atlas database!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding Error:', err);
    process.exit(1);
  }
}

seed();
