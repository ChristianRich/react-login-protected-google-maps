import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import AuthUserContext from './context'
import { withFirebase } from '../Firebase'
import { SIGN_IN } from '../../constants/routes'

/**
 * Higher Order Component conditionally rendering the passed in component for logged users or redirecting to /login
 * @param {Function} condition
 */
const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        redirect: false,
      }
    }

    async componentDidMount() {
      const authUser = this.props.firebase.getAuthUser()

      if (!condition(authUser)) {
        this.props.history.push({
          pathname: SIGN_IN,
          search: `?redirect=${this.props.location.pathname}`,
        })
      }
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) => {
            // TODO fix bug: authUser is null after initial authentication. Probably has to do with an async issue or race condition?
            const user = JSON.parse(localStorage.getItem('authUser'))
            return condition(user) ? (
              <Component authUser={user} {...this.props} />
            ) : null
          }}
        </AuthUserContext.Consumer>
      )
    }
  }

  return compose(withRouter, withFirebase)(WithAuthorization)
}

export default withAuthorization
