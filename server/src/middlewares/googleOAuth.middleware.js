import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import env from "../config/env.js";

export default function googleOAuthMiddleware(app) {
  app.use(passport.initialize());

  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: env.GOOGLE_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => done(null, profile),
    ),
  );
}
