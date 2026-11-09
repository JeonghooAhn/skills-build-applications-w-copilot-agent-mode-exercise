import { Router } from 'express';
import Workout from '../models/Workout.js';

const router = Router();

router.get('/', async (_request, response) => {
  const workouts = await Workout.find().lean();
  response.json(workouts);
});

export default router;
