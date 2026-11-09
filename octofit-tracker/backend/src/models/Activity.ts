import mongoose, { Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKilometers: { type: Number, min: 0 },
    calories: { type: Number, min: 0 },
    completedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model('Activity', activitySchema);
