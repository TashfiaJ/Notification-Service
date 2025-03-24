import { Request, Response } from "express";
import { sendNotification } from "../services/notificationService";

export const sendSMS = async (req: Request, res: Response) => {
  try {
    await sendNotification("sms", req.body);
    res.status(200).json({ message: "SMS request added to queue" });
  } catch (error) {
    res.status(500).json({ error: "Failed to queue SMS request" });
  }
};

export const sendEmail = async (req: Request, res: Response) => {
  try {
    await sendNotification("email", req.body);
    res.status(200).json({ message: "Email request added to queue" });
  } catch (error) {
    res.status(500).json({ error: "Failed to queue Email request" });
  }
};

