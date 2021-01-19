const Team = require("../models/Team")
const apiClient = require('./soccerAPI')


const findTeams = async (req, res) => {
  try {
    const response = await apiClient.fetchTeams()

    const teams = response.data.response
      .map(teamInfo => {
        const { id: teamId, name, logo, founded } = teamInfo.team
        return { teamId, name, logo, founded }
      })

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