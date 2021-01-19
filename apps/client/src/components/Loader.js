import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}))

function Loader() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress size={100} />
    </div>
  )
}

export default Loader