const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
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
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            async (email, password, done) => {
                try {
                    const user = await Admin.findOne({ email });
    
                    if (!user) {
                        return done(null, false, { message: 'Incorrect email.' });
                    }
    
                    const isMatch = await user.comparePassword(password);
                    if (!isMatch) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
    
                    user.provider = 'local';
                    await user.save();
    
                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

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