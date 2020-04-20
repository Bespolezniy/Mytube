import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./../components/shared/Home";
import UsersList from "./../components/user/UsersList";
import Signup from "./../components/auth/Signup";
import Signin from "./../components/auth/Signin";
import EditProfile from "./../components/user/EditProfile";
import Profile from "./../components/user/Profile";
import PrivateRoute from "./../utils/PrivateRoute";
import Menu from "./../components/shared/Menu";
import CreateVideo from "./../components/video/CreateVideo";
import VideoNav from "./../components/video/VideoNav";
import EditVideo from "./../components/video/EditVideo";

const MainRouter = ({ data }) => {
  return (
    <div>
      <Menu />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={UsersList} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <Route path="/user/:userId" component={Profile} />
        <PrivateRoute path="/media/new" component={CreateVideo} />
        <PrivateRoute path="/media/edit/:mediaId" component={EditVideo} />
        <Route
          path="/media/:mediaId"
          render={(props) => <VideoNav {...props} data={data} />}
        />
      </Switch>
    </div>
  );
};

export default MainRouter;
