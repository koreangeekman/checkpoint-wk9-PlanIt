import { Schema } from "mongoose";

export const NoteSchema = new Schema({
  body: { type: String, required: true, maxLength: 500 },
  taskId: { type: Schema.Types.ObjectId, required: true, ref: 'Task' },
  projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },

}, { timestamps: true, toJSON: { virtuals: true } })

NoteSchema.virtual('creator', {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: 'Account'
})

NoteSchema.virtual('project', {
  localField: "projectId",
  foreignField: "_id",
  justOne: true,
  ref: 'Project'
})

NoteSchema.virtual('task', {
  localField: "taskId",
  foreignField: "_id",
  justOne: true,
  ref: 'Task'
})