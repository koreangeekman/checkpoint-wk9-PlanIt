import { Schema } from "mongoose";

export const TaskSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  weight: { type: Number, required: true, max: 10 },
  isComplete: { type: Boolean, required: true, default: false },
  completedOn: { type: Date, required: false },
  sprintId: { type: Schema.Types.ObjectId, required: false, ref: 'Sprint' },
  projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },

}, { timestamps: true, toJSON: { virtuals: true } })

TaskSchema.virtual('creator', {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: 'Account'
})

TaskSchema.virtual('project', {
  localField: "projectId",
  foreignField: "_id",
  justOne: true,
  ref: 'Project'
})

TaskSchema.virtual('sprint', {
  localField: "sprintId",
  foreignField: "_id",
  justOne: true,
  ref: 'Sprint'
})