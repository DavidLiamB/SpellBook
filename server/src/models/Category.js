import { Schema } from "mongoose";

export const CatagorySchema = new Schema({
    name: { type: String, required: true, maxLength: 50 }
},
    { timestamps: true, toJSON: { virtuals: true } }
)