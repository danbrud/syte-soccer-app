import React, { useEffect, useState } from 'react'
import { apiClient } from '../api/apiClient'
import Team from './Team'
import { MEDIA_QUERIES, SNACKBAR_INFO } from '../consts'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  rootDesktop: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifySelf: 'center'
  },
  rootMobile: {
    margin: '16px'
  },
  rootLargeMobile: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    justifySelf: 'center'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  }
}))


const Teams = ({ openSnackbar }) => {
  const classes = useStyles()
  const isDesktop = useMediaQuery(MEDIA_QUERIES.desktop)
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile)

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

      openSnackbar(SNACKBAR_INFO.savedToFavorites)
    } catch (err) {
      openSnackbar(SNACKBAR_INFO.error)
    }
  }

  const removeTeamFromFavorites = async (teamId) => {
    try {
      await apiClient.deleteTeam(teamId)

      const updatedTeams = teams.map(team => team.teamId === teamId ? { ...team, isSaved: false } : team)
      setTeams(updatedTeams)

      openSnackbar(SNACKBAR_INFO.removedFromFavorites)
    } catch (err) {
      openSnackbar(SNACKBAR_INFO.error)
    }
  }

  return (
    <div className={isDesktop ? classes.rootDesktop : isMobile ? classes.rootMobile : classes.rootLargeMobile}>
    {/* // <div className={isDesktop ? classes.rootDesktop : classes.rootMobile}> */}
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