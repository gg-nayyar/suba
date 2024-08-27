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
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./api"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_mongo_1 = __importDefault(require("./models/user.mongo"));
dotenv_1.default.config();
const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    COOKIE_KEY1: process.env.COOKIE_KEY1,
    COOKIE_KEY2: process.env.COOKIE_KEY_2,
};
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: "http:/localhost:3000",
}));
app.use(express_1.default.json());
app.use('/', api_1.default);
function verifyCallback(accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(profile);
        if (profile.emails) {
            /** FUTURE SCHEMA
             * {
             *    _id: string;
             *    google_id: string;
             *    username: string;
             *    alias: string;
             *    google_profile: Object (google profile) | null,
             *    github_profile: Object (github profile) | null
             * }
             */
            let foundUser = yield user_mongo_1.default.find({ email: profile.emails[0].value });
            console.log("FOUND USER: ", foundUser);
            if (foundUser.length > 0) {
                foundUser[0].accessToken = accessToken;
                yield foundUser[0].save();
                done(null, {
                    profile,
                    accessToken,
                    refreshToken
                });
            }
            else {
                if (profile.name) {
                    console.log("HAS NAME");
                    const firstName = profile.name.givenName;
                    const lastName = profile.name.familyName;
                    const user = new user_mongo_1.default({
                        accessToken,
                        email: profile.emails[0].value,
                        firstName,
                        lastName,
                        id: profile.id,
                        username: profile.username,
                    });
                    yield user.save();
                }
            }
        }
        ;
        done(null, {
            profile,
            accessToken,
            refreshToken
        });
    });
}
app.use((0, express_session_1.default)({
    secret: [config.COOKIE_KEY1 || "error", config.COOKIE_KEY2 || "error"],
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
function checkedLoggedIn(req, res, next) {
    const isLoggedIn = false;
    if (!isLoggedIn) {
        return res.status(401).json({
            error: "You must log In!",
        });
    }
    return isLoggedIn;
}
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj || { error: "error" });
});
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: config.CLIENT_ID || "Client Id not found",
    clientSecret: config.CLIENT_SECRET || "Secret not found",
    callbackURL: "/auth/google/callback",
}, verifyCallback));
app.get("/auth/google", passport_1.default.authenticate("google", {
    scope: ["email", "https://www.googleapis.com/auth/admin.directory.user.readonly", "https://www.googleapis.com/auth/userinfo.profile"],
}));
app.get("/auth/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/failure",
    // successRedirect: "http://localhost:8000/something-test",
    session: true,
}), (req, res) => {
    const session = req.session;
    if (session.passport) {
        res.cookie('accessToken', session.passport.user.accessToken);
        return res.redirect("http://localhost:3000/home");
    }
    return res.json(req.session);
});
app.get("/auth/logout", (req, res) => { });
app.get("/is-signed-in", (req, res) => {
});
exports.default = app;
