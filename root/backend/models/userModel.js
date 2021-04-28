const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Your name is required"],
    },
    email: {
        type: String,
        required: [true, "You need to provide an email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "You need to provide a valid email"],
    },
    photo: {
        type: String,
        default: "default.jpg",
    },
    role: {
        type: String,
        enum: ["user", "guide", "lead-guide", "admin"],
        default: "user",
    },
    password: {
        type: String,
        required: [true, "You need to provide a password"],
        minlength: [8, "Password should contain at least 8 characters"],
        select: false,
        validate: [
            {
                validator: (el) => {
                    return validator.isStrongPassword(el, {
                        minLowercase: 0,
                        minUppercase: 1,
                        minNumbers: 0,
                        minSymbols: 0,
                    });
                },
                msg: "Password needs at least one uppercase",
            },
            {
                validator: (el) => {
                    return validator.isStrongPassword(el, {
                        minLowercase: 0,
                        minUppercase: 0,
                        minNumbers: 1,
                        minSymbols: 0,
                    });
                },
                msg: "Password needs at least one number",
            },
        ],
    },
    passwordConfirm: {
        type: String,
        required: [true, "You need to confirm your password"],
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function(el) {
                return el === this.password;
            },
            message: "Passwords do not match. Please try again",
        },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
});

userSchema.pre("save", async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified("password")) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre("save", function(next) {
    if (!this.isModified("password") || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
});

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
