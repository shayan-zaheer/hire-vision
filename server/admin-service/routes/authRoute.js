const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");

router
    .route("/google")
    .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router
    .route("/google/callback")
    .get(
        passport.authenticate("google", { failureRedirect: "/" }),
        (request, response) => {
            const user = {
                id: request.user._id,
                displayName: request.user.displayName,
                email: request.user?.email,
                profilePhoto: request.user.profilePhoto,
            };
    
            response.cookie("user", JSON.stringify(user), {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return response.redirect("http://localhost:3000/dashboard");
        }
    );

router
    .route("/github")
    .get(passport.authenticate("github", { scope: ["user:email"] }));

router
    .route("/github/callback")
    .get(
        passport.authenticate("github", { failureRedirect: "/" }),
        (request, response) => {
            const user = {
                id: request.user._id,
                displayName: request.user.displayName,
                email: request.user?.email,
                profilePhoto: request.user.profilePhoto,
            };
    
            response.cookie("user", JSON.stringify(user), {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return response.redirect("http://localhost:3000/dashboard");
        }
    );

router.route("/logout").get((request, response) => {
    request.logout(() => {
        response.clearCookie("user");
        response.redirect("http://localhost:3000/");
    });
});

router.route("/register").post(authController.register);

module.exports = router;