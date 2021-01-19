const { RESULTS_PER_PAGE } = require("../consts")
const Team = require("../models/Team")
const apiClient = require('./soccerAPI')


const findTeams = async (req, res) => {
  try {
    const { page } = req.query

    const [requestedTeams, savedTeams] = await Promise.all([
      apiClient.fetchTeams(),
      Team.find({}).select({ teamId: 1, '_id': 0 })
    ])

    let teams = requestedTeams.data.response
      .map(teamInfo => {
        const { id: teamId, name, logo, founded } = teamInfo.team
        return { teamId, name, logo, founded }
      })
      .map(team => {
        const teamInDB = savedTeams.some(teamIDs => team.teamId === teamIDs.toObject().teamId)
        return teamInDB ? { ...team, isSaved: true } : team
      })


    teams = teams.slice(page - 1, RESULTS_PER_PAGE)

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