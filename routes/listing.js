const express = require('express');
const router = express.Router();
const WrapAsync = require("../util/WrapAsync");
const ExpressError = require("../util/ExpressError");
const { listingSchema } = require('../schema');
const Listing = require('../models/listing');
const { isLoggedIn } = require('../middelware');
const { isOwner } = require('../middelware');
const listingController = require("../controllers/listing");
const multer = require("multer");
const {storage} = require("../cloudConfig");
const upload  = multer({ storage });


const validateListing = (req,res,next) =>{
  let {error} = listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }
};


router.route("/")
.get( WrapAsync(listingController.index))
.post(isLoggedIn,
  upload.single('listing[image]'),
  validateListing,
  WrapAsync(listingController.create)
);


// new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get( WrapAsync(listingController.show))
.put(isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  WrapAsync(listingController.update))
.delete(isLoggedIn,
  isOwner,
  WrapAsync(listingController.delete));


// edit route
router.get("/:id/edit",
  isLoggedIn,
  isOwner,
  WrapAsync(listingController.edit));

module.exports = router;