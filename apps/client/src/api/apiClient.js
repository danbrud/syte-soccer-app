import axios from 'axios'

export const apiClient = {
  fetchTeams: (page) => {
    return axios.get(`http://localhost:3000/api/teams?page=${page}`)
  },
  saveTeam: (teamId) => {
    return axios.post('http://localhost:3000/api/teams', { teamId })
  },
  deleteTeam: (teamId) => {
    return axios.delete(`http://localhost:3000/api/teams/${teamId}`)
  }
}