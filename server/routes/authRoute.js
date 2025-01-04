const express = require("express");
const router = express.Router();
const passport = require("passport");

function isAuthenticated(request, response, next) {
    if (request.isAuthenticated()) return next();
    response.redirect("/");
};

router.route("/status").get((request, response) => {
    if (request.isAuthenticated()) {
        return response.json({ status: "authenticated", profile: request.user });
    } else {
        return response.json({ status: "unauthenticated" });
    }
})

router
    .route("/google")
    .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router
    .route("/google/callback")
    .get(
        passport.authenticate("google", { failureRedirect: "/" }),
        (request, response) => {
            response.redirect("http://localhost:3000/dashboard");
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
            response.redirect("http://localhost:3000/dashboard");
        }
    );

router.route("/profile").get(isAuthenticated, (request, response) => {
    response.json({ message: `Welcome ${request.user.displayName}` });
});

router.route("/logout").get((request, response) => {
    request.logout(() => {
        response.redirect("http://localhost:3000/");
    });
});

module.exports = router;
