
const {listingSchema , reviewSchema} = require('../schema');
const Review = require('../models/review');
const Listing = require('../models/listing');
const {isLoggedIn ,isReviewAuthor} = require("../middelware");

module.exports.createReviews = async(req , res) => {
let listing = await Listing.findById(req.params.id);
let newReview = new Review(req.body.review);
newReview.author = req.user._id;
listing.reviews.push(newReview);
await newReview.save();
await listing.save();
req.flash("success", "New review created successfully");
res.redirect(`/listing/${listing._id}`);
}

module.exports.delete = async(req,res) => {
let {id,reviewId} = req.params;
await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
await Review.findByIdAndDelete(reviewId);
req.flash("success", "review delete successfully");
res.redirect(`/listing/${id}`);
}