import React from "react";
import { Link, withRouter } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  YouTube,
  AddBox,
  Person,
  ExitToApp,
  PersonAdd,
  LockOpen,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import auth from "../../utils/auth-helper";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff",
  },
  link: {
    color: theme.palette.primary.dark,
    fontWeight: "bold",
    textDecoration: "none",
  },
}));

const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: "#f99085" };
  else return { color: "#efdcd5" };
};

const Menu = withRouter(({ history }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <YouTube color="secondary" fontSize="large" />

        <div>
          <Link to="/" className={classes.link}>
            <Typography title="На главную">YouTube Clone</Typography>
          </Link>
        </div>

        <div style={{ position: "absolute", right: "10px" }}>
          <div style={{ float: "right" }}>
            {!auth.isAuthenticated() && (
              <span>
                <Link className={classes.link} to="/signup">
                  <Button startIcon={<PersonAdd />}>Sign up</Button>
                </Link>

                <Link className={classes.link} to="/signin">
                  <Button startIcon={<LockOpen />}>Sign In</Button>
                </Link>
              </span>
            )}

            {auth.isAuthenticated() && (
              <div>
                <Tooltip title="Создать видео">
                  <Link to="/media/new">
                    <IconButton style={isActive(history, "/media/new")}>
                      <AddBox color="primary" />
                    </IconButton>
                  </Link>
                </Tooltip>

                <Link
                  className={classes.link}
                  to={"/user/" + auth.isAuthenticated().user._id}
                >
                  <Button startIcon={<Person />}>My Profile</Button>
                </Link>

                <Button
                  className={classes.link}
                  color="inherit"
                  onClick={() => {
                    auth.clearJWT(() => history.push("/"));
                  }}
                  startIcon={<ExitToApp />}
                >
                  Sign out
                </Button>
              </div>
            )}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
});

export default Menu;
