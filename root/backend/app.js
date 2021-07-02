const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const exphbs = require("express-handlebars");
const compression = require("compression");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const bookingRouter = require("./routes/bookingRoutes");

// Access-Control-Allow-Origin *
// TODO: When front-end is deployed make sure to only allow my explodii app to make request to my backend api
// const app = express().use("*", cors({ origin: "www.explodii.com", credentials: true }));
const app = express().use("*", cors({ origin: true, credentials: true }));

// testing for secure https connections, especially for x-forwarded-proto header
app.enable("trust proxy");

app.options("*", cors());
// app.options("api/v1/tours/:id",cors());

// app.set("view engine", "html");
app.engine(
    "hbs",
    exphbs({
        extname: ".hbs",
        defaultLayout: "main",
    })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use("/static", express.static(path.join(__dirname, "../backend/assets/")));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
    max: 10000, // NOTE: I should change this number for security issues
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
    hpp({
        whitelist: [
            "duration",
            "ratingsQuantity",
            "ratingsAverage",
            "maxGroupSize",
            "difficulty",
            "price",
        ],
    })
);

app.use(compression());

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies);
    next();
});

// CORS browser bypass
// app.use(
//     cors({
//         allowedHeaders: ["Content-Type"], // headers that React is sending to the API
//         exposedHeaders: ["Content-Type"], // headers that you are sending back to React
//         origin: "*",
//         methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//         preflightContinue: false,
//     })
// );

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     next();
// });

// 3) ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
