import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Grid } from "@material-ui/core";

import VideoList from "../video/VideoList";
import { listPopular } from "../../api/api-media";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#f5f5f5",
  },
  title: {
    padding: theme.spacing(2.5),
    color: theme.palette.primary.dark,
    fontSize: "1.5em",
    fontWeight: 500
  },
  media: {
    minHeight: 330,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listPopular(signal).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMedia(data);
      }
    });
    
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <Card className={classes.card}>
          <Typography variant="h2" className={classes.title}>
            Popular Videos
          </Typography>

          <VideoList media={media} />
        </Card>
      </Grid>
    </Grid>
  );
}
