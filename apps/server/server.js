require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const api = require('./routes')

// const { PORT, CLIENT_BUILD_PATH, MONGODB_URI } = require('./consts')

const app = express()

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log('Error', err))

app.use(express.static(path.join(__dirname, CLIENT_BUILD_PATH)))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', api)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, CLIENT_BUILD_PATH, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})