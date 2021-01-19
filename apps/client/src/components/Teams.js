import React, { useEffect, useState } from 'react'
import { apiClient } from '../api/apiClient'
import Team from './Team'


const Teams = () => {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const fetchTeams = async () => {
      const data = await apiClient.fetchTeams()
      setTeams(data.teams)
    }

    fetchTeams()
  }, [])

  const saveTeamToFavorites = async (teamId) => {
    await apiClient.saveTeam(teamId)

    const updatedTeams = teams.map(team => team.teamId === teamId ? { ...team, isSaved: true } : team)
    setTeams(updatedTeams)
  }

  const removeTeamFromFavorites = async (teamId) => {
    await apiClient.deleteTeam(teamId)

    const updatedTeams = teams.map(team => team.teamId === teamId ? { ...team, isSaved: false } : team)
    setTeams(updatedTeams)
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