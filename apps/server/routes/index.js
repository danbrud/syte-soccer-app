const express = require('express')
const router = express.Router()
const createTeam = require('../service/createTeam')
const findTeams = require('../service/findTeams')
const removeTeam = require('../service/removeTeam')

router.get('/teams', findTeams)
router.post('/teams', createTeam)
router.delete('/teams/:teamId', removeTeam)

module.exports = router