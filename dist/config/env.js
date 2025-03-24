"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.RABBITMQ_URL = exports.emailProviders = exports.smsProviders = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const parseProviders = (key) => {
    var _a;
    const providers = ((_a = process.env[key]) === null || _a === void 0 ? void 0 : _a.split(",")) || [];
    return providers.map((provider) => {
        const [name, url, weight] = provider.split("|");
        return { name, url, weight: Number(weight) || 1 };
    });
};
exports.smsProviders = parseProviders("SMS_PROVIDERS");
exports.emailProviders = parseProviders("EMAIL_PROVIDERS");
exports.RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
exports.PORT = process.env.PORT || 3000;
