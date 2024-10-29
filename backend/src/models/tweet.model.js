import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300,
    },
    image: {
        type: String,
        default: null,
    },
    inReplyToTweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
        default: null,
    },
    inReplyToUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    retweetCount: {
        type: Number,
        default: 0,
    },
    likeCount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

tweetSchema.index({ user: 1, inReplyToTweetId: 1 });

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