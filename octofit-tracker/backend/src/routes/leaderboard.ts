import { Router } from 'express';
import Leaderboard from '../models/Leaderboard.js';

const router = Router();

router.get('/', async (_request, response) => {
  const entries = await Leaderboard.find()
    .sort({ points: -1 })
    .populate('user', 'username displayName')
    .lean();
  response.json(entries);
});

export default router;
