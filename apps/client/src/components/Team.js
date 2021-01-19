import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
}))


const Team = ({ team, saveTeamToFavorites, removeTeamFromFavorites }) => {
  const classes = useStyles()

  const { name, logo, teamId, founded, isSaved } = team

  return (
    <Card className={classes.root}>
      <CardHeader
        title={name}
      />
      <CardMedia
        className={classes.media}
        image={logo}
        title={name}
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          Founded in: {founded}
        </Typography>
      </CardContent>
      <CardActions>
        {
          isSaved
            ? <IconButton onClick={() => removeTeamFromFavorites(teamId)}>
              <FavoriteIcon />
            </IconButton>
            : <IconButton onClick={() => saveTeamToFavorites(teamId)}>
              <FavoriteBorderIcon />
            </IconButton>
        }
      </CardActions>
    </Card>
  )
}

export default Team