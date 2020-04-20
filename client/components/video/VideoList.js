import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

import { makeStyles } from "@material-ui/core/styles";
import { GridList, GridListTileBar, GridListTile } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    background: "#f5f5f5",
    textAlign: "left",
    padding: "0px 16px 16px 16px",
  },
  gridList: {
    width: "100%",
    minHeight: 180,
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    width: "100%",
  },
  tile: {
    textAlign: "center",
    maxHeight: "100%",
  },
  tileBar: {
    backgroundColor: "rgba(0, 0, 0, 0.72)",
    textAlign: "left",
    height: "55px",
  },
  tileTitle: {
    fontSize: "1.1em",
    marginBottom: "5px",
    color: "#fff",
    textDecoration: "none",
    display: "block",
  },
  tileGenre: {
    float: "right",
    color: "rgb(193, 182, 164)",
    marginRight: "8px",
  },
}));

export default function VideoList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={4}>
        {props.media.map((tile, i) => (
          <GridListTile key={i} className={classes.tile}>
            <Link to={"/media/" + tile._id}>
              <ReactPlayer
                url={"/api/media/video/" + tile._id}
                width="100%"
                height="inherit"
                style={{ maxHeight: "100%" }}
              />
            </Link>

            <GridListTileBar
              className={classes.tileBar}
              title={
                <Link to={"/media/" + tile._id} className={classes.tileTitle}>
                  {" "}
                  {tile.title}{" "}
                </Link>
              }
              subtitle={
                <span>
                  <span>{tile.views} views</span>
                  
                  <span className={classes.tileGenre}>
                    <em>{tile.genre}</em>
                  </span>
                </span>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

VideoList.propTypes = {
  media: PropTypes.array.isRequired,
};
