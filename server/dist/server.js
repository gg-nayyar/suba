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
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = 8000;
const server = http_1.default.createServer(app_1.default);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.connection.once('open', () => {
            console.log("MongoDB is connected");
        });
        mongoose_1.default.connection.on('error', (err) => {
            console.log(err);
        });
        try {
            yield mongoose_1.default.connect(MONGO_URI);
            server.listen(PORT, () => {
                console.log(`Server is running on hello port:${PORT}`);
            });
        }
        catch (err) {
            console.error(err);
        }
    });
}
startServer();
