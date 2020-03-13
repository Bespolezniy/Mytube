import React, { useState } from "react"
import { Link } from "react-router-dom"

import { 
  Card,
  CardContent, 
  TextField,
  Icon,
  CardActions,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { create } from "./api-user"

const useStyles = makeStyles( theme => ({
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px
    ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  }
}))

const SignUp = () => {

  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
    error: ""
  })
  const classes = useStyles()

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }
    create(user).then( data => {

      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        setValues({ ...values, error: "", open: true})
      }
    })
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Typography 
            type="headline" 
            component="h2"
            className={classes.title}
          >
            Sign Up
          </Typography>

          <TextField 
            id="name" 
            label="Name"
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <br/>
          
          <TextField 
            id="email" 
            type="email" 
            label="Email" 
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <br/>

          <TextField 
            id="password" 
            type="password"
            label="Password" 
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
          />
          <br/>

          {values.error && (
            <Typography component="p" color="error">
              <Icon 
                color="error"
              >
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>

        <CardActions>
          <Button 
            color="primary" 
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>

    <Dialog open={values.open} disableBackdropClick={true}>
      <DialogTitle>New Account</DialogTitle>

      <DialogContent>
        <DialogContentText>
          New account successfully created.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Link to="/signin">
          <Button 
            color="primary" 
            autoFocus="autoFocus" 
            variant="contained"
          >
            Sign In
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  </div>
  )
}
  

export default SignUp