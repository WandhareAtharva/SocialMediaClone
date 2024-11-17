import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minlength: 3,
            maxlength: 45,
            index: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
        },
        lastLogin: {
            type: Date
        },
        active: {
            type: Boolean,
            default: false,
        },
        profilePicture: {
            type: String,
            default: ""
        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

userSchema.index({ username: 1, email: 1 }, { unique: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.lastLoginUpdate = async function () {
    this.lastLogin = Date.now();
    this.active = true;
    await this.save();
}

userSchema.methods.StatusUpdate = async function (status) {
    this.active = status;
    await this.save();
}

userSchema.methods.setProfilePicture = async function (profilePicture) {
    this.profilePicture = profilePicture;
    await this.save();
}

userSchema.methods.removeProfilePicture = async function () {
    this.profilePicture = "";
    await this.save();
}

userSchema.methods.isPasswordCorrect = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};

userSchema.methods.generateAuthToken = function () {
    try {
        return jwt.sign(
            {
                _id: this._id,
                email: this.email,
                username: this.username,
                fullName: this.fullName
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
    } catch (error) {
        throw new Error('Error generating auth token');
    }
};

userSchema.methods.generateRefreshToken = function () {
    try {
        return jwt.sign(
            { _id: this._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );
    } catch (error) {
        throw new Error('Error generating refresh token');
    }
};

userSchema.pre('findOneAndDelete', async function (next) {
    const userId = this.getQuery()["_id"];
    try {
        await mongoose.model('UserProfile').findOneAndDelete({ user: userId });
        await mongoose.model('UserNotifications').findOneAndDelete({ user: userId });
        await mongoose.model('UserSettings').findOneAndDelete({ user: userId });
    } catch (error) {
        console.log(error);
        next(error);
    }
})

export const User = mongoose.model('User', userSchema);