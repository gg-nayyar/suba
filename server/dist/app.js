"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: 'http:/localhost:3000'
}));
app.use(express_1.default.json());
app.get("/auth/google", passport_1.default.authenticate('google', {
    scope: ['email']
}));
app.get("/auth/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: false,
}), (req, res) => {
    console.log("Google Called us Back");
});
app.get("/auth/logout", (req, res) => { });
exports.default = app;
