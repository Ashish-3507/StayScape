
const {listingSchema , reviewSchema} = require('../schema');
const Review = require('../models/review');
const Listing = require('../models/listing');

module.exports.createReviews = async(req , res) => {
let listing = await Listing.findById(req.params.id);
let newReview = new Review(req.body.review);
newReview.author = req.user._id;
listing.reviews.push(newReview);
await newReview.save();
await listing.save();
res.json({ success: true, message: "New review created successfully", data: newReview });
}

module.exports.delete = async(req,res) => {
let {id,reviewId} = req.params;
await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
await Review.findByIdAndDelete(reviewId);
res.json({ success: true, message: "review delete successfully" });
}