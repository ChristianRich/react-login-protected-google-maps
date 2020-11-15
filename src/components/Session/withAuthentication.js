import React from 'react'
import AuthUserContext from './context'
import { withFirebase } from '../Firebase'

/**
 * Higher Order Component checking for an authenticated user and passing the logged user (if any) to the AuthUser context
 */
const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        authUser: this.props.firebase.getAuthUser(),
      }
    }

    componentDidMount() {
      this.setState({
        authUser: this.props.firebase.getAuthUser(),
      })
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }

  return withFirebase(WithAuthentication)
}

export default withAuthentication
