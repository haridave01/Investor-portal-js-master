// app/api/auth/[...auth].ts
import { passportAuth } from "blitz"
import db from "db"
import { Strategy as GoogleStrategy } from "passport-google-oauth"

export default passportAuth({
  successRedirectUrl: "/",
  errorRedirectUrl: "/",
  strategies: [
    new GoogleStrategy(
      {
        consumerKey: "320030472926-vkrlb7qd77qedlshbpvg3ojavctq855i.apps.googleusercontent.com",
        consumerSecret: "jUkIqcmfxajN_Q-mRNo-Sgbx",
        callbackURL: "http://localhost:3000/api/auth/google/callback",
      },
      function (token, tokenSecret, profile, done) {
        db.user.findOrCreate({ googleId: profile.id }, function (err, user) {
          return done(err, user)
        })
      }
    ),
  ],
})
