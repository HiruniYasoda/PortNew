import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    rank: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    organization: { type: String, default: '' },
    image: { type: String, default: '' },
    stars: { type: Number, default: 5 },
  },
  { timestamps: true }
);

export const Achievement = mongoose.model('Achievement', achievementSchema);
