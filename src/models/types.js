import mongoose from 'mongoose'

const { Schema } = mongoose

const typesSchema = new Schema({
  _id: {
    type: mongoose.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  hex: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
})

export const Types = mongoose.model('Types', typesSchema, 'types')
