const { RESULTS_PER_PAGE } = require("../consts")

const calculateStartIndex = (page) => (page - 1) * RESULTS_PER_PAGE

const calculateEndIndex = (page) => page * RESULTS_PER_PAGE

module.exports = { calculateStartIndex, calculateEndIndex }