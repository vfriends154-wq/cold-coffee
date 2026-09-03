import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {

        username: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
        },

        full_name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        avatar_image: {
            type: String,
            required: true
        },

        cover_image: {
            type: String,  // cloudinary url
            required: true
        },

        watch_history: [
            {
                type: Schema.Types.ObjectId,
                ref: "Videos"

            }
        ],

        password: {
            type: String,
            required: [true, "Password is Required"]
        },

        refreshToken: {

            type: String,
            required: true

        }
    }, { timestamps: true }
);



userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
})
this.password = bcrypt.hash(this.password, 10);



userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {

    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname,
            username: this.username

        },
        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}


UserSchema.methods.generateAccessToken = function () {

    jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,

        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}



export const User = mongoose.model("User", userSchema);  