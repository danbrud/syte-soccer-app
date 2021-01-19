import axios from 'axios'

export const apiClient = {
  fetchTeams: () => {
    return axios.get('http://localhost:3000/api/teams')
  },
  saveTeam: (teamId) => {
    return axios.post('http://localhost:3000/api/teams', { teamId })
  },
  deleteTeam: (teamId) => {
    return axios.delete(`http://localhost:3000/api/teams/${teamId}`)
  }
}