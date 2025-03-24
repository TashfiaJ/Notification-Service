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
exports.publishMessage = exports.connectRabbitMQ = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const env_1 = require("../config/env");
let channel;
const connectRabbitMQ = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield amqplib_1.default.connect(env_1.RABBITMQ_URL);
    channel = yield connection.createChannel();
    yield channel.assertQueue("smsQueue", { durable: true });
    yield channel.assertQueue("emailQueue", { durable: true });
    yield channel.assertQueue("DLQ", { durable: true });
    console.log("Connected to RabbitMQ");
});
exports.connectRabbitMQ = connectRabbitMQ;
const publishMessage = (queue, message) => {
    if (!channel)
        throw new Error("RabbitMQ not initialized");
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
};
exports.publishMessage = publishMessage;
