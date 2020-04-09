import React from "react";
import { Link, withRouter } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AddBoxIcon from "@material-ui/icons/AddBox";

import auth from "./../auth/auth-helper";

const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: "#f99085" };
  else return { color: "#efdcd5" };
};

const Menu = withRouter(({ history }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography type="title" color="inherit">
        Youtube Clone
      </Typography>

      <div>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <HomeIcon />
          </IconButton>
        </Link>
      </div>

      <div style={{ position: "absolute", right: "10px" }}>
        <Link style={{ float: "right" }}>
          {!auth.isAuthenticated() && (
            <span>
              <Link to="/signup">
                <Button style={isActive(history, "/signup")}>Sign up</Button>
              </Link>

              <Link to="/signin">
                <Button style={isActive(history, "/signin")}>Sign In</Button>
              </Link>
            </span>
          )}

          {auth.isAuthenticated() && (
            <Link>
              <Link to="/media/new">
                <Button style={isActive(history, "/media/new")}>
                  <AddBoxIcon style={{ marginRight: "8px" }} /> Add Media
                </Button>
              </Link>

              <Link to={"/user/" + auth.isAuthenticated().user._id}>
                <Button
                  style={isActive(
                    history,
                    "/user/" + auth.isAuthenticated().user._id
                  )}
                >
                  My Profile
                </Button>
              </Link>
              
              <Button
                color="inherit"
                onClick={() => {
                  auth.signout(() => history.push("/"));
                }}
              >
                Sign out
              </Button>
            </Link>
          )}
        </Link>
      </div>
    </Toolbar>
  </AppBar>
));

export default Menu;
