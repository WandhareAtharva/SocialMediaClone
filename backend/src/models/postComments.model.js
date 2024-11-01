import mongoose from "mongoose";

const postCommentsSchema = new mongoose.Schema({
    tweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
        required: true,
    },
    comments: [{
        commentId: {
            type: String,
            required: true,
            trim: true,
            maxlength: 300,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        comment: {
            type: String,
            required: true,
            trim: true,
            maxlength: 300,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        likes: {
            type: Number,
            default: 0,
        },
    }],
}, { timestamps: true });

postCommentsSchema.index({ userId: 1, tweetId: 1 }, { unique: true });

postCommentsSchema.methods.toJSON = function () {
    const postComment = this;
    const postCommentObject = postComment.toObject();

    delete postCommentObject.__v;

    return postCommentObject;
}

export default mongoose.model("PostComments", postCommentsSchema);