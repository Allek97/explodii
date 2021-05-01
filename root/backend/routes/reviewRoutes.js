const express = require("express");
const reviewController = require("./../controllers/reviewController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

// TODO: FIND A SECURE WAY TO RESTRICT GET REQUEST FROM CLIENT SIDE
/* NOTE: I THINK BEST WAY IS JUST TO MAKE API THAT SHARE THE NECESSARY DATA 
 THAT WILL DISPLAYED IN FRONTEND AND PROTECTING THE REST IN BACKEND WITH JWT TOKENS */

router
    .route("/")
    .get(reviewController.getAllReviews)
    .post(
        authController.protect,
        authController.restrictTo("user"),
        reviewController.setTourUserIds,
        reviewController.createReview
    );

router.use(authController.protect);

router
    .route("/:id")
    .get(reviewController.getReview)
    .patch(
        authController.restrictTo("user", "admin"),
        reviewController.updateReview
    )
    .delete(
        authController.restrictTo("user", "admin"),
        reviewController.deleteReview
    );

module.exports = router;
