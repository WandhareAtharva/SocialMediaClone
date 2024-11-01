import mongoose from "mongoose";

const favoritesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tweetId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
        required: true,
    }]
}, { timestamps: true });

favoritesSchema.index({ userId: 1, tweetId: 1 }, { unique: true });

favoritesSchema.methods.toJSON = function () {
    const favorite = this;
    const favoriteObject = favorite.toObject();

    delete favoriteObject.__v;

    return favoriteObject;
}

export default mongoose.model("Favorites", favoritesSchema);