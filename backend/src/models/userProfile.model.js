import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 100,
    },
    location: {
        type: String,
        trim: true,
        maxlength: 45,
    },
    website: {
        type: String,
        trim: true,
        maxlength: 45,
    },
    birthday: {
        type: Date,
    }
}, { timestamps: true });

userProfileSchema.index({ userId: 1 }, { unique: true });

userProfileSchema.methods.toJSON = function () {
    const userProfile = this;
    const userProfileObject = userProfile.toObject();

    delete userProfileObject.__v;

    return userProfileObject;
}

export default mongoose.model("UserProfile", userProfileSchema);