"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.sendSMS = void 0;
const notificationService_1 = require("../services/notificationService");
const sendSMS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, notificationService_1.sendNotification)("sms", req.body);
        res.status(200).json({ message: "SMS request added to queue" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to queue SMS request" });
    }
});
exports.sendSMS = sendSMS;
const sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, notificationService_1.sendNotification)("email", req.body);
        res.status(200).json({ message: "Email request added to queue" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to queue Email request" });
    }
});
exports.sendEmail = sendEmail;
