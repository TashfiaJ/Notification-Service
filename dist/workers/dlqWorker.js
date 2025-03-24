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
const startDLQWorker = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield amqplib_1.default.connect("amqp://localhost");
    const channel = yield connection.createChannel();
    yield channel.assertQueue("DLQ", { durable: true });
    channel.consume("DLQ", (msg) => __awaiter(void 0, void 0, void 0, function* () {
        if (msg) {
            console.error("🚨 Message moved to DLQ:", msg.content.toString());
            channel.ack(msg);
        }
    }));
    console.log("DLQ Worker Started - Monitoring Failed Messages");
});
startDLQWorker();
