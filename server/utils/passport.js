const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

const configurePassport = app => {
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
            (accessToken, refreshToken, profile, done) => {
                return done(null, profile);
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
            (accessToken, refreshToken, profile, done) => {
                return done(null, profile);
            }
        )
    );

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
};

module.exports = configurePassport;
