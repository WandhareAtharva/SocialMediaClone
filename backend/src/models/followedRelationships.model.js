import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const followedRelationshipsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
}, { timestamps: true });

followedRelationshipsSchema.index({ userId: 1, followedUserId: 1 }, { unique: true });

followedRelationshipsSchema.methods.toJSON = function () {
    const followedRelationship = this;
    const followedRelationshipObject = followedRelationship.toObject();

    delete followedRelationshipObject.__v;

    return followedRelationshipObject;
}

export default mongoose.model("FollowedRelationships", followedRelationshipsSchema);