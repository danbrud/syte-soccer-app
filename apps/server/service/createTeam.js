const Team = require('../models/Team')

const createTeam = async (req, res) => {
  try {
    const team = new Team(req.body)
    await team.save()

    res
      .status(201)
      .json({
        success: true,
        team
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

module.exports = createTeam