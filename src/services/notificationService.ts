
import { publishMessage } from "./rabbitMQService";

export const sendNotification = async (type: "sms" | "email", data: any) => {
  const queue = type === "sms" ? "smsQueue" : "emailQueue";
  publishMessage(queue, data);
};

