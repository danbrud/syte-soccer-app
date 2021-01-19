const Team = require('../models/Team')

const removeTeam = async (req, res) => {
  try {
    const { teamId } = req.params
    const deletedTeam = await Team.findOneAndDelete({ teamId })

    res
      .status(200)
      .json({
        success: true,
        team: deletedTeam
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

module.exports = removeTeam