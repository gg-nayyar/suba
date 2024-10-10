import cors from "cors";
import api from "./api";
import path from "path"
import axios from "axios";
import helmet from "helmet";
import dot_env from "dotenv";
import express from "express";
import expressSession from "express-session";
import passport, { Profile } from "passport";
import { Strategy } from "passport-google-oauth20";
import { Request, Response, NextFunction } from "express";
import userMongo, { default as UserMongo } from "./models/user.mongo";

dot_env.config();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY1: process.env.COOKIE_KEY1,
  COOKIE_KEY2: process.env.COOKIE_KEY_2,
};

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization, accessToken",
  })
);
app.use("/media", express.static(path.join(__dirname, 'media')));

app.use(express.json());
app.use("/", api);

async function verifyCallback(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: Function
) {
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
    // user.username => /home -> no username
    // user.username == null => only /username
    // /username
    let foundUser = await UserMongo.find({ email: profile.emails[0].value });
    console.log("FOUND USER: ", foundUser);
    if (foundUser.length > 0) {
      foundUser[0].accessToken = accessToken;
      await foundUser[0].save();
      done(null, {
        profile,
        accessToken,
        refreshToken,
      });
    } else {
      if (profile.name) {
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const user = new UserMongo({
          accessToken,
          email: profile.emails[0].value,
          firstName,
          lastName,
          id: profile.id,
          username: null,
        });
        await user.save();
      }
    }
  }
  done(null, {
    profile,
    accessToken,
    refreshToken,
  });
  3;
}

app.use(
  expressSession({
    secret: [config.COOKIE_KEY1 || "error", config.COOKIE_KEY2 || "error"],
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj || { error: "error" });
});

passport.use(
  new Strategy(
    {
      clientID: config.CLIENT_ID || "Client Id not found",
      clientSecret: config.CLIENT_SECRET || "Secret not found",
      callbackURL: "/auth/google/callback",
    },
    verifyCallback
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "email",
      "https://www.googleapis.com/auth/admin.directory.user.readonly",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    // successRedirect: "http://localhost:8000/something-test",
    session: true,
  }),
  async (req, res) => {
    try {
      const session = req.session as expressSession.Session &
        Partial<expressSession.SessionData> & {
          passport: { user: { accessToken: string } };
        };
      if (session.passport) {
        const accessToken = session.passport.user.accessToken;

        res.cookie("accessToken", accessToken);

        return res.redirect("http://localhost:3000");
      } else {
        return res.json(req.session);
      }
    } catch (error) {
      console.error(error);
      if (!res.headersSent) {
        return res.status(500).send("Internal Server Error");
      }
    }
  }
);

app.get("/auth/logout", (req, res, next) => {
  res.clearCookie("accessToken", { path: "/" });
  return res.redirect("http://localhost:3000");
});

// GET: QUERY, PARAMETERS > for normal cases like id, tag, slug
//                          Authentication: headers (Authorization: `Bearer TOKEN`)
// POST, PUT, DELETE > BODY
//
interface TokenInfoResponse {
  error_description?: string;
  [key: string]: any;
}
app.post("/is-signed-in", async (req: Request, res: Response) => {
  const { accessToken } = req.body;

  async function verifyAccessToken(
    accessToken: string
  ): Promise<TokenInfoResponse | null> {
    try {
      const { data } = await axios.get<TokenInfoResponse>(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
      );

      if (data.error_description) {
        throw new Error(
          `Error verifying access token: ${data.error_description}`
        );
      }

      return data;
    } catch (error) {
      console.error("Error verifying access token:", error);
      return null;
    }
  }
  async function usernameExists(): Promise<Boolean> {
    const user = await userMongo.findOne({ username: null });
    return !!user;
  }
  const userExist = await usernameExists();
  const isValid = !!(await verifyAccessToken(accessToken));
  return res.json({ validity: isValid, userExist });
});

export default app;
