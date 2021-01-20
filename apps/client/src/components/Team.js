import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { MEDIA_QUERIES, UPDATE_ACTIONS } from '../consts'


const useStyles = makeStyles((theme) => ({
  rootDesktop: {
    maxWidth: 400,
    margin: '12px'
  },
  rootMobile: {
    margin: '12px auto'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundSize: 'auto'
  },
  secondaryText: {
    justifySelf: 'end',
    padding: '12px'
  },
  cardBottom: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  icon: {
    justifySelf: 'start'
  }
}))


const Team = ({ team, updateFavorites }) => {
  const classes = useStyles()
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile)

  const { name, logo, teamId, founded, isSaved } = team

  return (
    <Card className={isMobile ? classes.rootMobile : classes.rootDesktop}>
      <CardHeader title={name} />
      <CardMedia
        className={classes.media}
        image={logo}
        title={name}
      />
      <CardActions className={classes.cardBottom}>
        {
          isSaved
            ? (
              <IconButton
                className={classes.icon}
                onClick={() => updateFavorites(UPDATE_ACTIONS.removedFromFavorites, teamId)}
              >
                <FavoriteIcon />
              </IconButton>
            )
            : (
              <IconButton
                className={classes.icon}
                onClick={() => updateFavorites(UPDATE_ACTIONS.saveToFavorites, teamId)}
              >
                <FavoriteBorderIcon />
              </IconButton>
            )
        }
        <Typography variant='body2' color='textSecondary' component='p' className={classes.secondaryText}>
          Founded in: {founded}
        </Typography>
      </CardActions>
    </Card>
  )
}

export default Team