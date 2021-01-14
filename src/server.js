import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import router from './routes'

mongoose
  .connect(
    'mongodb+srv://leo:leo@pokeapi.g4umo.mongodb.net/pokeapi?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => console.log('Conectado ao mongo'))
  .catch(err => console.log(err))

const app = express()

app.use(bodyParser.json())
app.use('/api', router)

app.listen(5555, () => {
  console.log('Servidor rodando na porta 5555')
})
