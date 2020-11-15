import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { AuthUserContext } from '../Session'
import SignOut from '../SignOut'
import { HOME } from '../../constants/routes'

const Header = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser, firebase) =>
        authUser ? (
          <NavigationAuth authUser={authUser} firebase={firebase} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </div>
)

const NavigationAuth = (props) => (
  <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <NavItems />
      </Nav>
      <Nav>
        <SignOut {...props} />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

const NavItems = () => (
  <>
    <LinkContainer to={HOME}>
      <Nav.Link>Home</Nav.Link>
    </LinkContainer>
  </>
)

const NavigationNonAuth = () => (
  <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
    <Nav className="mr-auto">
      <span className="text-light">Acme Enterprises</span>
    </Nav>
  </Navbar>
)

export default Header
