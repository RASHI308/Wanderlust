const express =require("express");
const router =express.Router({mergeParams:true});
const wrapAsynch = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema}=require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor} =require("../middleware.js");
const reviewController=require("../controllers/reviews.js");

//reviews
//post route
router.post("/",isLoggedIn,validateReview,wrapAsynch(reviewController.createReview))
//Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsynch(reviewController.destroyReview))

module.exports=router;


