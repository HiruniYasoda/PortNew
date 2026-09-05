import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    italic: { type: String, default: '' },
    points: [{ type: String }],
    type: { type: String, enum: ['timeline', 'other'], default: 'timeline' },
  },
  { timestamps: true }
);

export const Education = mongoose.model('Education', educationSchema);
