import mongoose from "mongoose";

const postViewsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    viewCount: {
        type: Number,
        default: 1
    }
}, { timestamps: true });

postViewsSchema.index({ userId: 1, postId: 1 }, { unique: true });

export default mongoose.model("PostViews", postViewsSchema);