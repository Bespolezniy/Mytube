import React, { useState, useEffect, useRef } from "react";
import { findDOMNode } from "react-dom";
import screenfull from "screenfull";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

import { IconButton, Icon, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
  },
  primaryDashed: {
    background: "none",
    backgroundColor: theme.palette.secondary.main,
  },
  primaryColor: {
    backgroundColor: "#6969694f",
  },
  dashed: {
    animation: "none",
  },
  controls: {
    position: "relative",
    backgroundColor: "#000",
    margin: "0 11px",
  },
  rangeRoot: {
    position: "absolute",
    width: "100%",
    top: "-7px",
    zIndex: "3456",
    "-webkit-appearance": "none",
    backgroundColor: "rgba(0,0,0,0)",
  },
  videoError: {
    width: "100%",
    textAlign: "center",
    color: theme.palette.primary.light,
  },
  icon: {
    color: "#fff",
  },
  iconDisabled: {
    color: "rgba(255,255,255,0.3)",
  },
}));

export default function MediaPlayer(props) {
  const classes = useStyles();
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [loop, setLoop] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  let playerRef = useRef(null);
  const [values, setValues] = useState({
    played: 0,
    loaded: 0,
    ended: false,
  });

  useEffect(() => {
    if (screenfull.enabled) {
      screenfull.on("change", () => {
        let fullscreen = screenfull.isFullscreen ? true : false;
        setFullscreen(fullscreen);
      });
    }
  }, []);

  useEffect(() => {
    setVideoError(false);
  }, [props.srcUrl]);

  const changeVolume = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const toggleMuted = () => {
    setMuted(!muted);
  };

  const playPause = () => {
    setPlaying(!playing);
  };

  const onLoop = () => {
    setLoop(!loop);
  };

  const onProgress = (progress) => {
    if (!seeking) {
      setValues({
        ...values,
        played: progress.played,
        loaded: progress.loaded,
      });
    }
  };

  const onClickFullscreen = () => {
    screenfull.request(findDOMNode(playerRef));
  };

  const onEnded = () => {
    if (loop) {
      setPlaying(true);
    } else {
      props.handleAutoplay(() => {
        setValues({ ...values, ended: true });
        setPlaying(false);
      });
    }
  };

  const onDuration = (duration) => {
    setDuration(duration);
  };

  const onSeekMouseDown = (e) => {
    setSeeking(true);
  };

  const onSeekChange = (e) => {
    setValues({
      ...values,
      played: parseFloat(e.target.value),
      ended: parseFloat(e.target.value) >= 1,
    });
  };

  const onSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.seekTo(parseFloat(e.target.value));
  };

  const ref = (player) => {
    playerRef = player;
  };

  const format = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    let mm = date.getUTCMinutes();
    const ss = ("0" + date.getUTCSeconds()).slice(-2);

    if (hh) {
      mm = ("0" + date.getUTCMinutes()).slice(-2);
      return `${hh}:${mm}:${ss}`;
    }

    return `${mm}:${ss}`;
  };

  const showVideoError = (e) => {
    console.log(e);
    setVideoError(true);
  };

  return (
    <div>
      {videoError && (
        <p className={classes.videoError}>Video Error. Try again later.</p>
      )}

      <div className={classes.flex}>
        <ReactPlayer
          ref={ref}
          width={fullscreen ? "100%" : "inherit"}
          height={fullscreen ? "100%" : "inherit"}
          style={fullscreen ? { position: "relative" } : { maxHeight: "500px" }}
          config={{ attributes: { style: { height: "100%", width: "100%" } } }}
          url={props.srcUrl}
          playing={playing}
          loop={loop}
          playbackRate={playbackRate}
          volume={volume}
          muted={muted}
          onEnded={onEnded}
          onError={showVideoError}
          onProgress={onProgress}
          onDuration={onDuration}
        />
        <br />
      </div>

      <div className={classes.controls}>
        <LinearProgress
          color="secondary"
          variant="buffer"
          value={values.played * 100}
          valueBuffer={values.loaded * 100}
          style={{ width: "100%" }}
          classes={{
            colorPrimary: classes.primaryColor,
            dashedColorPrimary: classes.primaryDashed,
            dashed: classes.dashed,
          }}
        />

        <input
          type="range"
          min={0}
          max={1}
          value={values.played}
          step="any"
          onMouseDown={onSeekMouseDown}
          onChange={onSeekChange}
          onMouseUp={onSeekMouseUp}
          className={classes.rangeRoot}
        />

        <IconButton className={classes.icon} onClick={playPause}>
          <Icon>
            {playing ? "pause" : values.ended ? "replay" : "play_arrow"}
          </Icon>
        </IconButton>

        <IconButton disabled={!props.nextUrl} className={classes.icon}>
          <Link
            to={props.nextUrl}
            style={{ color: "inherit", marginBottom: "-5px" }}
          >
            <Icon>skip_next</Icon>
          </Link>
        </IconButton>

        <IconButton className={classes.icon} onClick={toggleMuted}>
          <Icon>
            {(volume > 0 && !muted && "volume_up") ||
              (muted && "volume_off") ||
              (volume == 0 && "volume_mute")}
          </Icon>
        </IconButton>

        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={muted ? 0 : volume}
          onChange={changeVolume}
          style={{ verticalAlign: "middle" }}
        />

        <span style={{ padding: "13px", color: "#fff" }}>
          <time dateTime={`P${Math.round(duration * values.played)}S`}>
            {format(duration * values.played)}
          </time>{" "}
          /{" "}
          <time dateTime={`P${Math.round(duration)}S`}>{format(duration)}</time>
        </span>

        <IconButton
          style={{ float: "right" }}
          className={classes.icon}
          onClick={onClickFullscreen}
        >
          <Icon>fullscreen</Icon>
        </IconButton>

        <IconButton
          className={loop ? classes.icon : classes.iconDisabled}
          onClick={onLoop}
          style={{ float: "right" }}
        >
          <Icon>loop</Icon>
        </IconButton>
      </div>
    </div>
  );
}

MediaPlayer.propTypes = {
  srcUrl: PropTypes.string,
  nextUrl: PropTypes.string,
  handleAutoplay: PropTypes.func.isRequired,
};
