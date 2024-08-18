import cors from "cors";
import helmet from "helmet";
import dot_env from "dotenv";
import express from "express";
import passport from "passport";
import cookieSession from "cookie-session";
import { Strategy } from "passport-google-oauth20";

dot_env.config();

const config ={
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY1: process.env.COOKIE_KEY1,
  COOKIE_KEY2: process.env.COOKIE_KEY_2

}
const app = express();

app.use(helmet());

app.use(cors({
    origin:'http:/localhost:3000'
}))

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

function verifyCallback(accessToken:string,refreshToken:string,profile:any,done:any ){
  console.log(profile);
  done(null,profile)
}

app.use(cookieSession({
  name: 'session',
  maxAge: 1000 * 60 * 60 * 24 * 31,
  keys: [config.COOKIE_KEY1|| "error",config.COOKIE_KEY2|| "error"],
}))

passport.serializeUser((user,done)=>{
  done(null, user);
})

passport.deserializeUser((obj,done)=>{
  done(null, obj||{error: "error"});
})

passport.use(new Strategy({
  clientID: config.CLIENT_ID || "Client Id not found",
  clientSecret:config.CLIENT_SECRET || "Secret not found",
  callbackURL: "/auth/google/callback"
},verifyCallback))

app.get("/auth/google",
    passport.authenticate('google',{
        scope:['email']
    })
)
app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/failure",
      successRedirect: "http://localhost:3000/home",
      session: true,
    }),
    (req, res) => {
      console.log("Google Called us Back");
    }
  );
  
  app.get("/auth/logout", (req, res) => {});
  
export default app;