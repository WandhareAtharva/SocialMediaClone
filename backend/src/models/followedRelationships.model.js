import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const followedRelationshipsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    followedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    followedAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

followedRelationshipsSchema.index({ userId: 1, followedUserId: 1 }, { unique: true });

followedRelationshipsSchema.methods.toJSON = function () {
    const followedRelationship = this;
    const followedRelationshipObject = followedRelationship.toObject();

    delete followedRelationshipObject.__v;

    return followedRelationshipObject;
}

export default mongoose.model("FollowedRelationships", followedRelationshipsSchema);