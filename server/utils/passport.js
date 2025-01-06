const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const Admin = require("../models/admin");

const configurePassport = (app) => {
    app.use(
        session({
            secret: "secret",
            resave: false,
            saveUninitialized: true,
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:8000/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await Admin.findOneAndUpdate(
                        { provider: "google", providerId: profile.id },
                        {
                            provider: "google",
                            providerId: profile.id,
                            displayName: profile.displayName,
                            email: profile.emails[0].value,
                            profilePhoto: profile.photos[0]?.value || "",
                        },
                        { upsert: true, new: true }
                    );
                    return done(null, user);
                } catch (err) {
                    return done(err, null);
                }
            }
        )
    );

    passport.use(
        new GitHubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: "http://localhost:8000/auth/github/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await Admin.findOneAndUpdate(
                        { provider: "github", providerId: profile.id },
                        {
                            provider: "github",
                            providerId: profile.id,
                            displayName: profile.displayName,
                            email:
                                profile.emails?.[0]?.value || "No public email",
                            profilePhoto: profile.photos[0]?.value || "",
                        },
                        { upsert: true, new: true }
                    );
                    return done(null, user);
                } catch (err) {
                    return done(err, null);
                }
            }
        )
    );

    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await Admin.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};

module.exports = configurePassport;
