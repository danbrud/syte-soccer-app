const axios = require('axios')
const { SOCCER_API_URI, SOCCER_API_HOST, SOCCER_API_KEY } = require('../consts')

axios.defaults.baseURL = SOCCER_API_URI
axios.defaults.headers.common['x-rapidapi-host'] = SOCCER_API_HOST
axios.defaults.headers.common['x-rapidapi-key'] = SOCCER_API_KEY

const fetchTeams = () => {
  return axios.get('/teams?country=spain')
}

module.exports = { fetchTeams }