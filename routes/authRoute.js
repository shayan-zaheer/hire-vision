const express = require("express");
const router = express.Router();
const passport = require("passport");

router
    .route("/google")
    .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/google/callback").get(passport.authenticate("google", {failureRedirect: "/"}), (request, response) => {
    response.redirect("/auth/profile");
});

router.route("/profile").get((request, response) => {
    response.send(`Welcome ${request.user.displayName}`);
});

router.route("/logout").get((request, response) => {
    request.logout(() => {
        response.redirect("/");
    });
})

router.route("/github").get(passport.authenticate("github", {scope: ["user:email"]}));

router.route("/github/callback").get(passport.authenticate("github", {failureRedirect: "/"}), (request, response) => {
    response.redirect("/auth/profile-git");
} )

router.route("/profile-git").get((request, response) => {
    response.send(request.user.username);
})

module.exports = router;
