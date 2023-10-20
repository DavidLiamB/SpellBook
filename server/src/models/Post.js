import mongoose, { Schema } from "mongoose";

export const PostSchema = new Schema(
    {
        postBody: { type: String, required: true, maxLength: 250 },
        postTitle: { type: String, required: true, maxLength: 50 },
        imgUrl: { type: String, maxLength: 500 },
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
        categoryId: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
        category2Id: { type: Schema.Types.ObjectId, ref: "Category2" }
    },
    {
        timestamps: true, toJSON: { virtuals: true }
    }
)

PostSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

PostSchema.virtual('likes', {
    count: true,
    localField: '_id',
    foreignField: 'postId',
    ref: 'Like'
})