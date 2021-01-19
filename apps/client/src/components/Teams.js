import React, { useEffect, useState } from 'react'
import { apiClient } from '../api/apiClient'
import Team from './Team'
import { SNACKBAR_INFO } from '../consts'


const Teams = ({ setSnackbar }) => {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await apiClient.fetchTeams()
      setTeams(response.data.teams)
    }

    fetchTeams()
  }, [])

  const saveTeamToFavorites = async (teamId) => {
    try {
      await apiClient.saveTeam(teamId)

      const updatedTeams = teams.map(team => team.teamId === teamId ? { ...team, isSaved: true } : team)
      setTeams(updatedTeams)

      setSnackbar({ ...SNACKBAR_INFO.savedToFavorites, open: true })
    } catch (err) {
      setSnackbar({ ...SNACKBAR_INFO.error, open: true })
    }
  }

  const removeTeamFromFavorites = async (teamId) => {
    try {
      await apiClient.deleteTeam(teamId)

      const updatedTeams = teams.map(team => team.teamId === teamId ? { ...team, isSaved: false } : team)
      setTeams(updatedTeams)

      setSnackbar({ ...SNACKBAR_INFO.removedFromFavorites, open: true })
    } catch (err) {
      setSnackbar({ ...SNACKBAR_INFO.error, open: true })
    }
  }

  return (
    <div>
      {teams.map(team => <Team
        key={team.teamId}
        team={team}
        saveTeamToFavorites={saveTeamToFavorites}
        removeTeamFromFavorites={removeTeamFromFavorites}
      />)}
    </div>
  )
}

export default Teams