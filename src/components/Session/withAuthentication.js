import React from 'react'
import AuthUserContext from './context'
import { withFirebase } from '../Firebase'

/**
 * Higher Order Component checking for an authenticated user and passing the logged user (if any) to the child context
 */
const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
      }
    }

    componentDidMount() {
      // this.listener = this.props.firebase.onAuthUserListener(
      //   (authUser) => {
      //     localStorage.setItem('authUser', JSON.stringify(authUser))
      //     this.setState({ authUser })
      //   },
      //   () => {
      //     localStorage.removeItem('authUser')
      //     this.setState({ authUser: null })
      //   }
      // )
    }

    // componentWillUnmount() {
    //   if (this.listener) {
    //     this.listener()
    //   }
    // }

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