import mongoose from "mongoose";

const postViewsSchema = new mongoose.Schema({
    tweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    viewCount: {
        type: Number,
        default: 1
    }
}, { timestamps: true });

postViewsSchema.index({ userId: 1, postId: 1 }, { unique: true });

postViewsSchema.methods.toJSON = function () {
    const postView = this;
    const postViewObject = postView.toObject();

    delete postViewObject.__v;

    return postViewObject;
}

export default mongoose.model("PostViews", postViewsSchema);