import { Router } from "express";
import { sendSMS, sendEmail } from "../controllers/notificationController";

const router = Router();

router.post("/sms", sendSMS);
router.post("/email", sendEmail);

export default router;

