


import { Request, Response, NextFunction } from "express";
// import CoachInfo from "../models/coachInfo";
import axios from "axios";

export const getCoachDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // const coaches = await CoachInfo.find().populate('userId');
    let response = await axios.get(
      `${process.env.API_GATEWAY_URL}/auth/auth/coachInfo`
    );

    let coaches: any = response.data.data;

    if (!coaches || coaches.length === 0) {
      res.status(404).json({ message: "No coaches found" });
      return;
    }

    const transformedCoaches = coaches
      .filter((coach: { userId: any; }) => coach.userId && (coach.userId as any).role === 'Coach')
      .map((coach: { userId: any; _id: { toString: () => any; }; profileImage: any; about: any; rating: any; title: any; }) => {
        const user = coach.userId as any;
        return {
          id: coach._id.toString(),
          imageUrl: coach.profileImage || "",
          motivationPitch: coach.about || "", // ✅ Using coach.title correctly
          name: `${user.firstName} ${user.lastName}`,
          rating: coach.rating || 0,
          title:coach.title
        };
      });

    res.status(200).json({
      content: transformedCoaches
    });
  } catch (error) {
    console.error("Error fetching coach details:", error);
    next(error);
  }
};
