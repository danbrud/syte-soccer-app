import React, { useEffect, useState } from 'react'
import Teams from './Teams'
import Loader from './Loader'
import { apiClient } from '../api/apiClient'
import { PAGE_DIRECTION, SNACKBAR_INFO, UPDATE_ACTIONS } from '../consts'

const TeamsContainer = ({ openSnackbar }) => {
  const [teams, setTeams] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const scrollToTop = () => window.scrollTo(0, 0)

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await apiClient.fetchTeams(page)
      setTeams(response.data.teams)

      setIsLoading(false)
      scrollToTop()
    }

    setIsLoading(true)
    fetchTeams()
  }, [page])

  const saveTeamToFavorites = async (teamId) => {
    await apiClient.saveTeam(teamId)
    const updatedTeams = teams.map(team => team.teamId === teamId ? { ...team, isSaved: true } : team)

    setTeams(updatedTeams)
    openSnackbar(SNACKBAR_INFO.savedToFavorites)
  }

  const removeTeamFromFavorites = async (teamId) => {
    await apiClient.deleteTeam(teamId)
    const updatedTeams = teams.map(team => team.teamId === teamId ? { ...team, isSaved: false } : team)

    setTeams(updatedTeams)
    openSnackbar(SNACKBAR_INFO.removedFromFavorites)
  }

  const updateFavorites = (type, teamId) => {
    try {
      if (type === UPDATE_ACTIONS.saveToFavorites) {
        saveTeamToFavorites(teamId)
      } else {
        removeTeamFromFavorites(teamId)
      }
    } catch (err) {
      openSnackbar(SNACKBAR_INFO.error)
    }
  }

  const changePage = (direction) => () => {
    const updatedPageNumber = direction === PAGE_DIRECTION.next ? page + 1 : page - 1
    setPage(updatedPageNumber)
  }

  return (
    isLoading
      ? <Loader />
      : <Teams
        teams={teams}
        page={page}
        updateFavorites={updateFavorites}
        changePage={changePage}
      />
  )
}

export default TeamsContainer