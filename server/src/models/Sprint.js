import { Schema } from "mongoose";

export const SprintSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  isOpen: { type: Boolean, required: true, default: true },
  projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }

}, { timestamps: true, toJSON: { virtuals: true } })

SprintSchema.virtual('creator', {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: 'Account'
})

SprintSchema.virtual('project', {
  localField: "projectId",
  foreignField: "_id",
  justOne: true,
  ref: 'Project'
})