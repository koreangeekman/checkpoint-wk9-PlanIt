import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true, maxLength: 96 },
    picture: { type: String, required: false, maxLength: 256 },
    github: { type: String, required: false, maxLength: 64 },
    linkedin: { type: String, required: false, maxLength: 64 },
    website: { type: String, required: false, maxLength: 64 },
    bio: { type: String, required: false, maxLength: 500 },
    title: { type: String, required: false, maxLength: 50 },
    appAuthor: { type: Boolean, required: false, default: false },
    settingsId: { type: Schema.Types.ObjectId, required: false },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

AccountSchema.virtual('noteCount', {
  localField: '_id',
  foreignField: 'creatorId',
  ref: 'Note',
  count: true
})

AccountSchema.virtual('sprintCount', {
  localField: '_id',
  foreignField: 'creatorId',
  ref: 'Sprint',
  count: true
})

AccountSchema.virtual('taskCount', {
  localField: '_id',
  foreignField: 'creatorId',
  ref: 'Task',
  count: true
})

AccountSchema.virtual('projectCount', {
  localField: '_id',
  foreignField: 'creatorId',
  ref: 'Project',
  count: true
})