const express = require("express");
const bookingController = require("./../controllers/bookingController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.get("/checkout-session/:tourId", bookingController.getCheckoutSession);

router
    .route("/my-bookings")
    .get(bookingController.getMe, bookingController.getMyBookings);

router.route("/order/:session_id").get(bookingController.getOrderStatus);

router.use(authController.restrictTo("admin", "lead-guide"));

router
    .route("/")
    .get(bookingController.getAllBookings)
    .post(bookingController.createBooking);

router
    .route("/:id")
    .get(bookingController.getBooking)
    .patch(bookingController.updateBooking)
    .delete(bookingController.deleteBooking);

module.exports = router;
