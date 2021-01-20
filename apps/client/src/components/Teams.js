import React, { useEffect, useRef, useState } from 'react'
import { apiClient } from '../api/apiClient'
import Team from './Team'
import { MEDIA_QUERIES, PAGE_DIRECTION, SNACKBAR_INFO, UPDATE_ACTIONS } from '../consts'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'
import Loader from './Loader'
import PageNavigation from './PageNavigation'


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
    <>
      {
        isLoading
          ? < Loader />
          : <div className={isDesktop ? classes.rootDesktop : isMobile ? classes.rootMobile : classes.rootLargeMobile}>
            {teams.map(team => (
              <Team
                key={team.teamId}
                team={team}
                updateFavorites={updateFavorites}
              />))}
          </div>
      }
      <PageNavigation
        pageNum={page}
        changePage={changePage}
      />
    </>
  )
}

export default Teams