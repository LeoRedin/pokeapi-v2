import mongoose from 'mongoose'

const { Schema, model } = mongoose

const pokemonsSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  types: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Types' }],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  pokedex: {
    type: Number,
    required: true,
  },
  moves: {
    type: [],
    required: true,
  },
  image: {
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

export const Pokemons = model('Pokemons', pokemonsSchema, 'pokemons')
