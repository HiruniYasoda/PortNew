import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tagline: { type: String, default: '' },
    category: { 
      type: String, 
      enum: ['Web Projects', 'Mobile App', 'Systems', 'Concept & UX'], 
      required: true 
    },
    shortDesc: { type: String, default: '' },
    description: { type: String, default: '' },
    concept: { type: String, default: '' },
    innovativeness: { type: String, default: '' },
    problems: { type: String, default: '' },
    learned: { type: String, default: '' },
    image: { type: String, required: true },
    technologies: [{ type: String }],
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    figma: { type: String, default: '' },
    demo: { type: String, default: '' },
    keyFeatures: [{ type: String }],
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
