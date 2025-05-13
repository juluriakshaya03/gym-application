// import { createBookedWorkout } from '../controllers/workoutController';
// import express from 'express';
// import { protect, clientOnly } from "../middlewares/authMiddleware"
// const router = express.Router();

// router.post('/', protect, clientOnly, createBookedWorkout);

// export default router;


import { createBookedWorkout } from '../controllers/workoutController';
import express from 'express';
import { protect} from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', protect, createBookedWorkout);

export default router;

