import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

import { 
  Card,
  CardContent, 
  TextField,
  Icon,
  CardActions,
  Button,
  Typography
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { read, update } from "./api-user"
import auth from "../auth/auth-helper"

const useStyles = makeStyles( theme => ({
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px
    ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  }
}))

const EditProfile = ({match}) => {

  const [values, setValues] = useState({
    userId: "",
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
    redirectToProfile: false
  })
  const jwt = auth.isAuthenticated()
  const classes = useStyles()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then( data => {

      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({
          ...values, 
          name: data.name, 
          email: data.email
        })
      }

    })
    return () => {
      abortController.abort()
    }
  }, [])

  const handleSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }
    update({
      userId: match.params.userId
    }, {
      t: jwt.token
    }, user).then( data => {

      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({
          ...values, 
          userId: data._id, 
          redirectToProfile: true
        })
      }

    })
  }

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }

  if (values.redirectToProfile) {
    return (<Redirect to={"/user/" + values.userId}/>)
  }

  return (
    <Card>
      <CardContent>
        <Typography 
          type="headline" 
          component="h2" 
          className={classes.title}
        >
          Edit Profile
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
        
        {
          values.error && (
            <Typography component="p" color="error">
              <Icon color="error">
                error
              </Icon>
              {values.error}
            </Typography>
          )
        }
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
  )
}
  
export default EditProfile