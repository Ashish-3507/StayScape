const express = require('express');
const router = express.Router({mergeParams: true});
const WrapAsync = require("../util/WrapAsync");
const ExpressError = require("../util/ExpressError");
const {listingSchema , reviewSchema} = require('../schema');
const Review = require('../models/review');
const Listing = require('../models/listing');
const {isLoggedIn ,isReviewAuthor} = require("../middelware");
const reviewController = require("../controllers/reviews");



const validateReview = (req,res,next) =>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }
};



router.post("/" ,
  isLoggedIn,
  validateReview,
  WrapAsync( reviewController.createReviews));


//delete review rout
router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  WrapAsync(reviewController.delete)
); 

module.exports = router;