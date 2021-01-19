const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = new Schema({
  teamId: Number
})

const Team = mongoose.model('Team', teamSchema)

module.exports = Team