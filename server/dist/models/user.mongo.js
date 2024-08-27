"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    contactNumber: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model('User', userSchema);
