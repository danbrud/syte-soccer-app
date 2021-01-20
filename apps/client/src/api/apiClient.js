import axios from 'axios'

export const apiClient = {
  fetchTeams: (page) => {
    return axios.get(`/api/teams?page=${page}`)
  },
  saveTeam: (teamId) => {
    return axios.post('/api/teams', { teamId })
  },
  deleteTeam: (teamId) => {
    return axios.delete(`/api/teams/${teamId}`)
  }
}