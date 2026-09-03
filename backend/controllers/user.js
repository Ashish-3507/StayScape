const User = require("../models/user");



module.exports.signup = async(req,res, next)=>{
    try{
        let {username, email, password} = req.body;
    const newUser = new User({
        email,username
    });
    const registerUser = await User.register(newUser, password);
    req.login(registerUser, (err)=>{
        if(err){return next(err);}
        res.json({ success: true, message: "user register successfully", user: registerUser });
    })
    
    } catch(e){
        res.status(400).json({ success: false, error: e.message });
    }
}



module.exports.login = async(req,res)=>{
    res.json({ success: true, message: "welcome to the StayScape", user: req.user });
}

module.exports.logout = (req,res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.json({ success: true, message: "you are logged out !!" });
    });
}

module.exports.currentUser = (req, res) => {
    res.json({ success: true, user: req.user || null });
};