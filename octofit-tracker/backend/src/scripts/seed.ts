import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase();

    const teams = await Promise.all([
      Team.findOneAndUpdate(
        { name: 'Trail Blazers' },
        { $set: { description: 'A team focused on outdoor running and hiking.', members: [] } },
        { upsert: true, new: true, runValidators: true },
      ),
      Team.findOneAndUpdate(
        { name: 'Core Strength' },
        { $set: { description: 'A team building strength through consistent training.', members: [] } },
        { upsert: true, new: true, runValidators: true },
      ),
    ]);

    const [alex, jordan, sam] = await Promise.all([
      User.findOneAndUpdate(
        { username: 'alex.runner' },
        {
          $set: {
            email: 'alex.runner@example.com',
            passwordHash: 'seeded-test-account-no-login',
            displayName: 'Alex Rivera',
            team: teams[0]._id,
          },
        },
        { upsert: true, new: true, runValidators: true },
      ),
      User.findOneAndUpdate(
        { username: 'jordan.moves' },
        {
          $set: {
            email: 'jordan.moves@example.com',
            passwordHash: 'seeded-test-account-no-login',
            displayName: 'Jordan Lee',
            team: teams[0]._id,
          },
        },
        { upsert: true, new: true, runValidators: true },
      ),
      User.findOneAndUpdate(
        { username: 'sam.strength' },
        {
          $set: {
            email: 'sam.strength@example.com',
            passwordHash: 'seeded-test-account-no-login',
            displayName: 'Sam Patel',
            team: teams[1]._id,
          },
        },
        { upsert: true, new: true, runValidators: true },
      ),
    ]);

    await Promise.all([
      Team.findByIdAndUpdate(teams[0]._id, { $set: { members: [alex._id, jordan._id] } }),
      Team.findByIdAndUpdate(teams[1]._id, { $set: { members: [sam._id] } }),
    ]);

    const now = new Date();
    const activities = [
      {
        _id: new mongoose.Types.ObjectId('650000000000000000000001'),
        user: alex._id,
        type: 'Running',
        durationMinutes: 35,
        distanceKilometers: 5.2,
        calories: 410,
        completedAt: new Date(now.getTime() - 86_400_000),
      },
      {
        _id: new mongoose.Types.ObjectId('650000000000000000000002'),
        user: jordan._id,
        type: 'Cycling',
        durationMinutes: 45,
        distanceKilometers: 14.5,
        calories: 520,
        completedAt: new Date(now.getTime() - 43_200_000),
      },
      {
        _id: new mongoose.Types.ObjectId('650000000000000000000003'),
        user: sam._id,
        type: 'Strength Training',
        durationMinutes: 50,
        calories: 330,
        completedAt: new Date(now.getTime() - 21_600_000),
      },
    ];

    await Promise.all(
      activities.map(({ _id, ...activity }) =>
        Activity.findByIdAndUpdate(_id, { $set: activity }, { upsert: true, runValidators: true }),
      ),
    );

    const period = now.toISOString().slice(0, 7);
    await Promise.all([
      Leaderboard.findOneAndUpdate(
        { user: alex._id, period },
        { $set: { points: 420 } },
        { upsert: true, new: true, runValidators: true },
      ),
      Leaderboard.findOneAndUpdate(
        { user: jordan._id, period },
        { $set: { points: 360 } },
        { upsert: true, new: true, runValidators: true },
      ),
      Leaderboard.findOneAndUpdate(
        { user: sam._id, period },
        { $set: { points: 390 } },
        { upsert: true, new: true, runValidators: true },
      ),
    ]);

    const workouts = [
      {
        name: 'Beginner Interval Run',
        description: 'Alternate easy jogging and brisk walking to build endurance.',
        difficulty: 'beginner',
        durationMinutes: 25,
        target: 'Cardio',
      },
      {
        name: 'Full Body Strength',
        description: 'A balanced bodyweight routine for major muscle groups.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        target: 'Strength',
      },
      {
        name: 'Mobility and Recovery',
        description: 'Gentle mobility exercises to support recovery and flexibility.',
        difficulty: 'beginner',
        durationMinutes: 20,
        target: 'Flexibility',
      },
    ] as const;

    await Promise.all(
      workouts.map(({ name, ...workout }) =>
        Workout.findOneAndUpdate(
          { name },
          { $set: workout },
          { upsert: true, new: true, runValidators: true },
        ),
      ),
    );

    console.log('Database seeding complete');
  } catch (error) {
    throw error;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

void seedDatabase().catch((error: unknown) => {
  console.error('Error seeding database:', error);
  process.exitCode = 1;
});
