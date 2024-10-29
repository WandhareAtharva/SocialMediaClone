import mongoose from 'mongoose';

const postLikesSchema = new mongoose.Schema({
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    tweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true
    },
}, { timestamps: true });

postLikesSchema.index({ userId: 1, tweetId: 1 }, { unique: true });

postLikesSchema.methods.toJSON = function () {
    const postLike = this;
    const postLikeObject = postLike.toObject();

    delete postLikeObject.__v;

    return postLikeObject;
}

export default mongoose.model('PostLikes', postLikesSchema);