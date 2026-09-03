const express = require('express');
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../util/WrapAsync");
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');
const userController = require("../controllers/user");



router.get("/", (req, res) => {
    res.redirect("/signup");
});

router.route("/signup")
.post( wrapAsync(userController.signup));


router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ success: false, error: "Invalid username or password" });
        req.logIn(user, (err) => {
            if (err) return next(err);
            return userController.login(req, res);
        });
    })(req, res, next);
});
    

router.get("/logout", userController.logout);

router.get("/current_user", userController.currentUser);


module.exports =  router;