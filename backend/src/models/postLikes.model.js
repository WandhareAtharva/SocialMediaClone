import mongoose from 'mongoose';

const postLikesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true
    },
    likeSentAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { timestamps: true });

postLikesSchema.index({ userId: 1, tweetId: 1 }, { unique: true });

export default mongoose.model('PostLikes', postLikesSchema);