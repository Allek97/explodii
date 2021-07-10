/* eslint-disable camelcase */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Tour = require("../models/tourModel");
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    // 1) Get the currently booked tour
    const tour = await Tour.findById(req.params.tourId);

    // 2) Create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        // success_url: `${process.env.CLIENT_URL}/excursions/?session_id={CHECKOUT_SESSION_ID}&tour_id=${tour._id}`,
        success_url: `${process.env.CLIENT_URL}/account/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/excursions/${tour.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.tourId,
        line_items: [
            {
                name: `${tour.name} Excursion`,
                description: tour.summary,
                images: [
                    `https://explodii.s3.us-east-2.amazonaws.com/img/tours/${
                        tour.imageCover.split(".")[0]
                    }-450x300.jpg`,
                ],
                amount: tour.price * 100,
                currency: "cad",
                quantity: 1,
            },
        ],
    });

    // 3) Create session as response
    res.status(200).json({
        status: "success",
        session,
    });
});

// exports.createBookingCheckout = catchAsync(async (req, res, next) => {
//     // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
//     const { tour, user, price } = req.query;

//     if (!tour && !user && !price) return next();
//     await Booking.create({ tour, user, price });

//     res.redirect(req.originalUrl.split("?")[0]);
// });

exports.getMe = catchAsync(async (req, res, next) => {
    req.params.id = req.user.id;
    next();
});

const createBookingCheckout = async (session) => {
    const tour = session.client_reference_id;
    const user = (await User.findOne({ email: session.customer_email })).id;
    const price = session.amount_total / 100;
    await Booking.create({ tour, user, price });
};

exports.webhookCheckout = (req, res, next) => {
    const signature = req.headers["stripe-signature"];

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed")
        createBookingCheckout(event.data.object);

    res.status(200).json({ received: true });
};

exports.getOrderStatus = catchAsync(async (req, res, next) => {
    const { session_id } = req.params;

    if (session_id) {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const tour = session.client_reference_id;
        const user = (await User.findOne({ email: session.customer_email })).id;
        const price = session.amount_total / 100;

        // const customer = await stripe.customers.retrieve(
        //     session.customer_email
        // );

        res.status(200).json({
            status: "successful purchase",
            tour,
            user,
            price,
        });
    }
});

exports.getMyBookings = catchAsync(async (req, res, next) => {
    const bookings = await Booking.find({ user: req.user.id });

    const tourIDs = bookings.map((el) => el.tour);
    const tours = await Tour.find({ _id: { $in: tourIDs } });

    res.status(200).json({
        status: "success",
        title: "My bookings",
        tours,
    });
});

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
