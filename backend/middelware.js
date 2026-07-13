const Listing = require("./models/listing");
const Review = require("./models/review");


module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be loged-in");
        return res.redirect("/login");
    }
    next();
};


module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){

        let url = req.session.redirectUrl;

        // if coming from review delete route → go back to listing page
        if(url.includes("/reviews")){
            url = url.split("/reviews")[0];
        }

        res.locals.redirectUrl = url;
    }
    next();
};


module.exports.isOwner = async (req,res,next)=>{

    let { id } = req.params;

    const listing = await Listing.findById(id);

    if(!listing){
        req.flash("error","Listing not found");
        return res.redirect("/listing");
    }

    if(!req.user || !listing.owner.equals(req.user._id)){
        req.flash("error", "you dont have access to this");
        return res.redirect(`/listing/${id}`);
    }

    next(); 
};


module.exports.isReviewAuthor = async (req,res,next)=>{

    let { id, reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if(!review){
        req.flash("error","Review not found");
        return res.redirect(`/listing/${id}`);
    }

    if(!req.user || !review.author.equals(req.user._id)){
        req.flash("error", "you dont have access to this");
        return res.redirect(`/listing/${id}`);
    }

    next(); 
};