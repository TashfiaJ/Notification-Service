"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationController_1 = require("../controllers/notificationController");
const router = (0, express_1.Router)();
router.post("/sms", notificationController_1.sendSMS);
router.post("/email", notificationController_1.sendEmail);
exports.default = router;
