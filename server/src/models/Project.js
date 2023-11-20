import { Schema } from "mongoose";

export const ProjectSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: true, maxLength: 500 },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },

}, { timestamps: true, toJSON: { virtuals: true } })

ProjectSchema.virtual('creator', {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: 'Account'
})

// ProjectSchema.virtual('members', {
//   localField: "_id",
//   foreignField: "creatorId",
//   ref: 'Member'
// })