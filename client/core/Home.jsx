import React, { useState, useEffect } from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Card, Typography } from "@material-ui/core"

import MediaList from "../media/MediaList"
import { listPopular } from "../media/api-media.js"

const useStyles = makeStyles(theme => ({
  card: {
    margin: `${theme.spacing(5)}px 30px`
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px 0px`,
    color: theme.palette.text.secondary,
    fontSize: "1em"
  },
  media: {
    minHeight: 330
  }
}))

export default function Home() {
  const classes = useStyles()
  const [media, setMedia] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listPopular(signal).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setMedia(data)
      }
    })
    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <Card className={classes.card}>
      <Typography variant="h2" className={classes.title}>
        Popular Videos
      </Typography>
      
      <MediaList media={media} />
    </Card>
  )
}