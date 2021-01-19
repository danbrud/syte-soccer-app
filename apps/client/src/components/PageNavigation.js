import React from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { makeStyles, Typography } from '@material-ui/core'
import { PAGE_DIRECTION } from '../consts'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    userSelect: 'none',
    height: '50px',
    alignContent: 'center'
  },
  arrowBack: {
    justifySelf: 'end',
    cursor: 'pointer'
  },
  arrowForward: {
    justifySelf: 'start',
    cursor: 'pointer'
  },
  pageNum: {
    justifySelf: 'center'
  }
}))

const PageNavigation = ({ pageNum, changePage }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ArrowBackIosIcon
        className={classes.arrowBack}
        onClick={changePage(PAGE_DIRECTION.previous)}
      />
      <Typography className={classes.pageNum}>
        {pageNum}
      </Typography>
      <ArrowForwardIosIcon
        className={classes.arrowForward}
        onClick={changePage(PAGE_DIRECTION.next)}
      />
    </div>
  )
}

export default PageNavigation