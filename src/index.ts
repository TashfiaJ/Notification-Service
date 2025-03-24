// import express, { RequestHandler, NextFunction, Express } from "express";
// import dotenv from "dotenv";

// // Initialize dotenv for environment variables
// dotenv.config();

// // Helper function to simulate random failure
// const randomFail = () => {
//     if (Math.random() < 0.5) {
//         throw new Error("Random failure occurred");
//     }
// };

// const bangladeshiPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;

// // Middleware to validate SMS request body
// const validateSmsBody: RequestHandler = (req, res, next) => {
//     const { phone, text } = req.body;

//     if (!phone || !bangladeshiPhoneRegex.test(phone)) {
//         return res.status(400).json({ error: "Invalid or missing phone number" });
//     }

//     if (!text || typeof text !== "string" || text.trim().length === 0) {
//         return res.status(400).json({ error: "Invalid or missing text" });
//     }

//     return next();
// };

// // Middleware to validate Email request body
// const validateEmailBody: RequestHandler = (req, res, next) => {
//     const { subject, body, recipients } = req.body;

//     if (!subject || typeof subject !== "string" || subject.trim().length === 0) {
//         return res.status(400).json({ error: "Invalid or missing subject" });
//     }

//     if (!body || typeof body !== "string" || body.trim().length === 0) {
//         return res.status(400).json({ error: "Invalid or missing body" });
//     }

//     if (!Array.isArray(recipients) || recipients.length === 0) {
//         return res
//             .status(400)
//             .json({ error: "Invalid or missing recipients list" });
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     for (const email of recipients) {
//         if (!emailRegex.test(email)) {
//             return res
//                 .status(400)
//                 .json({ error: `Invalid email in recipients: ${email}` });
//         }
//     }

//     return next();
// };

// function validateBody(type: "sms" | "email") {
//     if (type === "sms") {
//         return validateSmsBody;
//     }

//     if (type === "email") {
//         return validateEmailBody;
//     }

//     return (_req: Request, _res: Response, next: NextFunction) => next();
// }

// function registerApi(app: Express, type: "sms" | "email", index: number, port: number) {
//     // SMS APIs
//     console.log(`registering /api/${type}/provider${index}, port ${port}`)
//     app.post(
//         `/api/${type}/provider${index}`,
//         validateBody(type),
//         (req: Request, res: Response) => {
//             try {
//                 randomFail();
//                 console.log(
//                     new Date().toISOString(),
//                     `Sending ${type} via Provider ${index}:`,
//                     req.body
//                 );
//                 res.status(200).json({message: `${type.toUpperCase()} sent via Provider ${index}`,});
//             } catch (error) {
//                 res.status(500).json({error: `Failed to send ${type} via Provider ${index}`,
//                 });
//             }
//         }
//     );
// }

// for (let index = 1; index < 4; index++) {
//     // Create an instance of an Express app
//     const smsApp = express();
//     smsApp.use(express.json());
//     const smsPort = parseInt(process.env[`PORT_SMS_${index}`] || "") || 8070 + index;

//     const emailApp = express();
//     emailApp.use(express.json());
//     const emailPort = parseInt(process.env[`PORT_EMAIL_${index}`] || "") || 8090 + index;

//     registerApi(smsApp, "sms", index, smsPort);
//     registerApi(emailApp, "email", index, emailPort);

//     smsApp.listen(smsPort, () => {
//         console.log(`SMS Provider ${index} running on port ${smsPort}`);
//     });
//     emailApp.listen(emailPort, () => {
//         console.log(`Email Provider ${index} running on port ${emailPort}`);
//     });
// }

import express from "express";
import { connectRabbitMQ } from "./services/rabbitMQService";
import notificationRoutes from "./routes/notificationRoutes";
import { PORT } from "./config/env";

const app = express();
app.use(express.json());
app.use("/api", notificationRoutes);

connectRabbitMQ();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
