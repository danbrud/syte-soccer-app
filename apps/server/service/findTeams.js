const { extractTeamIds, getCurrentPageResults } = require("../helpers")
const Team = require("../models/Team")
const apiClient = require('./soccerAPI')


const findTeams = async (req, res) => {
  try {
    const { page } = req.query

    const [requestedTeams, savedTeams] = await Promise.all([
      apiClient.fetchTeams(),
      // new Promise((resolve, reject) => resolve(1)),
      Team.find({}).select({ teamId: 1, '_id': 0 })
    ])

    const teamIdsInDB = extractTeamIds(savedTeams)

    let teams = requestedTeams.data.response
      .map(teamInfo => {
        const { id: teamId, name, logo, founded } = teamInfo.team
        return { teamId, name, logo, founded }
      })
      .map(team => {
        const teamIndex = teamIdsInDB.indexOf(team.teamId)
        return teamIndex > -1 ? { ...team, isSaved: true } : team
      })


    teams = getCurrentPageResults(page, teams)

    res
      .status(200)
      .json({
        success: true,
        teams
      })
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        error: err.message
      })
  }
}

module.exports = findTeams