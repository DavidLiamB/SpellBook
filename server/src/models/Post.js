import mongoose, { Schema } from "mongoose";

export const PostSchema = new Schema(
    {
        postBody: { type: String, required: true, maxLength: 250 },
        imgUrl: { type: String, maxLength: 500 },
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
        categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
        category2Id: { type: Schema.Types.ObjectId, ref: "Category2" }
    },
    {
        timestamps: true, toJSON: { virtuals: true }
    }
)