const express = require('express')
const router = express.Router()
const createTeam = require('../services/createTeam')
const findTeams = require('../services/findTeams')

router.get('/teams', findTeams)
router.post('/teams', createTeam)

module.exports = router