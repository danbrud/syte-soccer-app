import axios from 'axios'

export const apiClient = {
  fetchTeams: async () => {
    const response = await axios.get('http://localhost:3000/api/teams')
    return response.data
  },
  saveTeam: (teamId) => {
    return axios.post('http://localhost:3000/api/teams', { teamId })
  },
  deleteTeam: (teamId) => {
    return axios.post(`http://localhost:3000/api/teams/${teamId}`)
  }
}