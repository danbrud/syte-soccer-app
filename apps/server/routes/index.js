const express = require('express')
const router = express.Router()
const createTeam = require('../services/createTeam')

router.get('/teams')
router.post('teams', createTeam)

module.exports = router