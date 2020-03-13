import React, { useState, useEffect } from "react"
import { Redirect, Link } from "react-router-dom"

import { 
  Paper,
  List, 
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  IconButton,
  Typography
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Person, Edit } from "@material-ui/icons"

import { read } from "./api-user"
import auth from "../auth/auth-helper"
import DeleteUser from "./DeleteUser"

const useStyles = makeStyles( theme => ({
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px
    ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  }
}))

const Profile = ({match}) => {

  const [user, setUser] = useState("")
  const [redirectToSignIn, setRedirectToSignIn] = useState(false)
  const jwt = auth.isAuthenticated()
  const classes = useStyles()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then( data => {
      if (data && data.error) {
        setRedirectToSignIn(true)
      } else {
        setUser(data)
      }
    })

    return () => {
      abortController.abort()
    }
  }, [match.params.userId])

  if (redirectToSignIn) {
    return (<Redirect to="/signin"/>)
  }

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Profile
        </Typography>

        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person/>
              </Avatar>
            </ListItemAvatar>

            <ListItemText 
              primary={user.name}
              secondary={user.email}
            />

            {auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id && (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/" + user._id}>
                  <IconButton color="primary">
                    <Edit/>
                  </IconButton>
                </Link>

                <DeleteUser userId={user._id}/>
              </ListItemSecondaryAction>
            )}
          </ListItem>
          <Divider/>

          <ListItem>
            <ListItemText 
              primary={"Joined: " + (new Date(user.created)).toDateString()}
            />
          </ListItem>
        </List>
      </Paper>
    </div>
  )
}
  
export default Profile