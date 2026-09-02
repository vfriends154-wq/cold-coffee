import mongoose, { Schema } from mongoose;
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const videoSchema = new mongoose.Schema(
    {

        video_file: {
            type: String,  // get url from cloudinary.
            required: true
        },

        thumbmail: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        duration: {
            type: Number,
            required: true

        },

        views: {

            type: Number,
            default: 0

        },

        owner: {

            type:Schema.Types.ObjectId,
            ref:"User"

        }






    }
    , { timestamps: true })

videoSchema.plugin(mongooseAggregatePaginate)


export const Video = mongoose.model("Video", videoSchema)