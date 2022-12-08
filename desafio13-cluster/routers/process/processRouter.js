import { Router } from 'express';
import randoms from './randoms.js';

const router = Router();

router.use('/api', randoms)

export default router;