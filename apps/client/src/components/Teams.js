import React from 'react'
import Team from './Team'
import { MEDIA_QUERIES, } from '../consts'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'
import PageNavigation from './PageNavigation'


const useStyles = makeStyles((theme) => ({
  rootDesktop: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifySelf: 'center',
    justifyItems: 'center'
  },
  rootMobile: {
    margin: '16px'
  },
  rootLargeMobile: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    justifySelf: 'center',
    justifyItems: 'center'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  }
}))


const Teams = ({ teams, page, updateFavorites, changePage }) => {
  const classes = useStyles()
  const isDesktop = useMediaQuery(MEDIA_QUERIES.desktop)
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile)


  return (
    <>
      <div className={isDesktop ? classes.rootDesktop : isMobile ? classes.rootMobile : classes.rootLargeMobile}>
        {teams.map(team => (
          <Team
            key={team.teamId}
            team={team}
            updateFavorites={updateFavorites}
          />))}
      </div>
      <PageNavigation
        pageNum={page}
        changePage={changePage}
      />
    </>
  )
}

export default Teams