import { Response } from 'express';
import BookedWorkout from '../models/bookedWorkouts';
import { AuthRequest } from '../middlewares/authMiddleware';

// @desc    Create a new booked workout
// @route   POST /api/workouts
// @access  Public

export const createBookedWorkout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      coachId,
      date,
      about,
      timeSlot,
      type,
      feedbackId,
      state
    } = req.body;

    const clientId = req.user?._id;

    if (
      !clientId ||
      !coachId ||
      !date ||
      !about ||
      !timeSlot ||
      !timeSlot.start ||
      !timeSlot.end ||
      typeof timeSlot.isBooked !== 'boolean' ||
      !timeSlot.duration ||
      !state
    ) {
      res.status(400).json({ message: 'Missing required fields in payload' });
      return;
    }

    const selectedDate = new Date(date);
    const now = new Date();

    if (selectedDate < now) {
      res.status(400).json({ message: 'Cannot book a workout in the past' });
      return;
    }

    const newWorkout = await BookedWorkout.create({
      clientId,
      coachId,
      date: selectedDate,
      about,
      timeSlot,
      type: type || 'default',
      feedbackId: feedbackId || null,
      state,
    });

    res.status(201).json(newWorkout);
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

