import React, { useState } from "react"
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

import { signin } from "./api-auth"
import auth from "./auth-helper"

const useStyles = makeStyles( theme => ({
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px
    ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  }
}))

const SignIn = (props) => {

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectTo: false
  })
  const classes = useStyles()

  const handleSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }

    signin(user).then( data => {

      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        auth.authenticate(data, () => {
          setValues({ 
            ...values, 
            error: "",
            redirectTo: true
          })
        })
      }

    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const { from } = props.location.state || {
    from: {
      pathname: "/"
    }
  }

  if (values.redirectTo) {
    return (<Redirect to={from}/>)
  }

  return (
    <Card>
      <CardContent>
        <Typography 
          type="headline" 
          component="h2" 
          className={classes.title}
        >
          Sign In
        </Typography>

        <TextField 
          id="email" 
          type="email" 
          label="Email"  
          value={values.email} 
          onChange={handleChange("email")} 
          margin="normal"/>
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
              <Icon color="error">error</Icon>
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
  
export default SignIn