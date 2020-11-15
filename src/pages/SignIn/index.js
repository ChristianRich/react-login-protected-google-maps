import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from '../../components/Firebase'
import LoadingDot from '../../components/LoadingDot'
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import * as ROUTES from '../../constants/routes'
import qs from 'query-string'
import './index.scss'

class SignInFormBase extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: 'admin@test.com',
      password: '123456',
      error: null,
      redirect: null,
      submitting: false,
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({ submitting: true })
    const { email, password } = this.state

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        // Get URL query params
        const query = qs.parse(this.props.location.search, {
          ignoreQueryPrefix: true,
        })

        // Get redirect path from query params or set default value to HOME
        const { redirect = ROUTES.HOME } = query

        this.setState({
          redirect: redirect,
          error: null,
        })
      })
      .catch((error) => {
        this.setState({
          error,
          submitting: false,
        })
      })
  }

  render() {
    const { error, redirect, submitting } = this.state

    // Redirect on successful login
    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <p className="text-center">Sign in</p>

          <FormGroup controlId="email">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              name="password"
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>

          <Button
            event="signin.click"
            className="btn btn-primary"
            block
            disabled={!this.validateForm() || submitting}
            type="submit"
          >
            {submitting ? <LoadingDot color="light" /> : <span>Signin</span>}
          </Button>

          {error && (
            <div className="mt-4">
              <FontAwesomeIcon
                className="mr-2"
                color="red"
                icon={faExclamationCircle}
              />
              <span>{error.message}</span>
            </div>
          )}
        </form>
      </div>
    )
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase)

export default SignInForm
