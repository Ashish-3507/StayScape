const Listing = require("./models/listing");
const Review = require("./models/review");


module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.status(401).json({ success: false, error: "You must be loged-in" });
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
        return res.status(404).json({ success: false, error: "Listing not found" });
    }

    if(!req.user || !listing.owner.equals(req.user._id)){
        return res.status(403).json({ success: false, error: "you dont have access to this" });
    }

    next(); 
};


module.exports.isReviewAuthor = async (req,res,next)=>{

    let { id, reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if(!review){
        return res.status(404).json({ success: false, error: "Review not found" });
    }

    if(!req.user || !review.author.equals(req.user._id)){
        return res.status(403).json({ success: false, error: "you dont have access to this" });
    }

    next(); 
};
