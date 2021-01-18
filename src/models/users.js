import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const SALT_WORK_FACTOR = 10

const { Schema, model } = mongoose

const usersSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
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

usersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
    return next()
  } catch (err) {
    return next(err)
  }
})

usersSchema.methods.validatePassword = async function validatePassword(
  password,
  cb,
) {
  const match = await bcrypt.compare(password, this.password)

  if (match) {
    return cb(null, match)
  }

  return cb('Senhas não conferem')
}

export const Users = model('Users', usersSchema, 'users')
