const express =require("express");
const router =express.Router();
const wrapAsynch = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({storage })

router.route("/")
.get( wrapAsynch(listingController.index))
.post(isLoggedIn,validateListing,upload.single("listing[image]"), wrapAsynch(listingController.createListing));

//New Route
router.get("/new",isLoggedIn, (listingController.renderNewForm));

router.route("/:id")
.get( wrapAsynch(listingController.showListing))
.put(isLoggedIn, isOwner,upload.single("listing[image]"),validateListing,wrapAsynch(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsynch(listingController.destroyListing));


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsynch(listingController.editListing));

module.exports=router;