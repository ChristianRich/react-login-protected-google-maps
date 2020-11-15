import React from 'react'
import { withFirebase } from '../Firebase'
import { Nav } from 'react-bootstrap'

const SignOutButton = (props) => (
  <Nav.Link onClick={props.firebase.doSignOut}>
    <span>
      Sign Out <small>{props.authUser.email}</small>
    </span>
  </Nav.Link>
)

export default withFirebase(SignOutButton)
