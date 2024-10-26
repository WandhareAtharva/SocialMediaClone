import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const tweetSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    inReplyToTweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
    },
    inReplyToUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    retweetCount: {
        type: Number,
        default: 0,
    },
    favoriteCount: {
        type: Number,
        default: 0,
    },
    language: {
        type: String,
        default: "en",
    },
    country: {
        type: String,
    }
}, { timestamps: true });

tweetSchema.pre("save", async function (next) {
    if (!this.isModified("text")) {
        next();
    }
    this.text = this.text.replace(/<[^>]*>/g, "");
    next(); f
});

tweetSchema.methods.toJSON = function () {
    const tweet = this;
    const tweetObject = tweet.toObject();

    delete tweetObject.__v;

    return tweetObject;
}

tweetSchema.methods.isTweetOwner = async function (userId) {
    return this.user.toString() === userId;
}

export const Tweet = mongoose.model("Tweet", tweetSchema);