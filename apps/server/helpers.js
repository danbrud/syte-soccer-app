const { RESULTS_PER_PAGE } = require("./consts")

const calculateStartIndex = (page) => (page - 1) * RESULTS_PER_PAGE

const calculateEndIndex = (page) => page * RESULTS_PER_PAGE

const getCurrentPageResults = (page, teams) => teams.slice(calculateStartIndex(page), calculateEndIndex(page))

const extractTeamIds = (teamDocuments) => teamDocuments.map(teamDoc => teamDoc.teamId)

module.exports = { calculateStartIndex, calculateEndIndex, extractTeamIds, getCurrentPageResults }