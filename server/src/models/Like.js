import mongoose, { Schema } from "mongoose";

export const LikeSchema = new Schema(
    {
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        postId: { type: Schema.Types.ObjectId, required: true, ref: 'Posts' },
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

LikeSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

LikeSchema.virtual('post', {
    localField: 'postId',
    foreignField: '_id',
    justOne: true,
    ref: 'Posts'
})

LikeSchema.index({ creatorId: 1, postId: 1 }, { unique: true })