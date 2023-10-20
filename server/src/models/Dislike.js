import mongoose, { Schema } from "mongoose";

export const DislikeSchema = new Schema(
    {
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        postId: { type: Schema.Types.ObjectId, required: true, ref: 'Posts' },
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

DislikeSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

DislikeSchema.virtual('post', {
    localField: 'postId',
    foreignField: '_id',
    justOne: true,
    ref: 'Posts'
})

DislikeSchema.index({ creatorId: 1, postId: 1 }, { unique: true })