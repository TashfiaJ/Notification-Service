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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const providerManager_1 = require("../utils/providerManager");
const retryHandler_1 = require("../utils/retryHandler");
const providerManager = providerManager_1.ProviderManager.getInstance();
const startEmailWorker = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield amqplib_1.default.connect("amqp://localhost");
    const channel = yield connection.createChannel();
    yield channel.assertQueue("emailQueue", { durable: true });
    channel.consume("emailQueue", (msg) => __awaiter(void 0, void 0, void 0, function* () {
        if (msg) {
            const message = JSON.parse(msg.content.toString());
            let provider = providerManager.getBestProvider("email");
            let success = false;
            for (let attempts = 0; attempts < 3 && !success; attempts++) {
                try {
                    yield (0, retryHandler_1.sendWithRetry)(provider, message);
                    success = true;
                }
                catch (_a) {
                    provider = providerManager.getBestProvider("email"); // Switch provider if failure
                }
            }
            if (!success) {
                yield channel.sendToQueue("DLQ", msg.content, { persistent: true });
            }
            channel.ack(msg); // Acknowledge message after processing
        }
    }));
    console.log("📧 Email Worker Started");
});
startEmailWorker();
