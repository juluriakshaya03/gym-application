import express from "express";
import cors from "cors";
import helmet from "helmet";
import coachProfile from "./routes/coachProfileRoute";
import coachesRouter from "./routes/coachesRoute";
import workoutRoutes from "./routes/workoutRoutes";
import timeSlotRoutes from "./routes/timeSlotRoutes";
import bookedWorkoutRoutes from "./routes/bookedWorkoutRoutes";
import searchRouter from './routes/searchRoutes';
import cancelWot from './routes/cancelWotRoute';
import timeSlotModifyRoutes from './routes/timeSlotModificationRoute';
import feedbackRouter from "./routes/feedbackRoutes";
import finishWorkoutRouter from "./routes/finishWorkoutRoute";
// import userRoutes from "./routes/user.routes";

const app = express();

app.use(express.json());
// app.use(cors());
app.use(helmet());

// app.use("/api/users", userRoutes);

// Health check route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// API routes
app.use('/coach', coachProfile);
app.use('/find', searchRouter);   
app.use('/coaches', coachesRouter);   // ⚠️ Note: consider combining these two to avoid double /coaches

app.use('/api/workouts', workoutRoutes);
app.use('/api/timeslots', timeSlotRoutes);
app.use('/api/bookedworkouts', bookedWorkoutRoutes);
app.use('/api',cancelWot);
app.use('/api/modifytimeslots', timeSlotModifyRoutes);
app.use('/api/feedbacks', feedbackRouter);
app.use('/api', finishWorkoutRouter);



export default app;
