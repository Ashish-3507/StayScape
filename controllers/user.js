const express = require('express');
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../util/WrapAsync");
const passport = require('passport');
const { saveRedirectUrl } = require('../middelware');
const userController = require("../controllers/user");


module.exports.renderSignup = (req,res)=>{
    res.render("user/signup");
}

module.exports.signup = async(req,res, next)=>{
    try{
        let {username, email, password} = req.body;
    const newUser = new User({
        email,username
    });
    const registerUser = await User.register(newUser, password);
    req.login(registerUser, (err)=>{
        if(err){return next(err);}
        req.flash("success", "user register successfully");
    res.redirect("/listing");
    })
    
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLogin = (req,res)=>{
    res.render("user/login");
}

module.exports.login = async(req,res)=>{
    req.flash("success", "welcome to the StayScape");
        let redirectUrl = res.locals.redirectUrl || "/listing";
        res.redirect(redirectUrl);
}

module.exports.logout = (req,res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "you are logged out !!");
        res.redirect("/listing");
    })
}