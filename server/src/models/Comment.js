import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    postBody: { type: String, required: true, MaxLength: 250 },
    postId: { type: Schema.Types.ObjectId, required: true, ref: 'Posts' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }


},
    { timestamps: true, toJSON: { virtuals: true } }
)
CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'

})

