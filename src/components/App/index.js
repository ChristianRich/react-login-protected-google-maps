import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation from '../Navigation'
import SignIn from '../../pages/SignIn'
import Home from '../../pages/Home'
import NotFound from '../../pages/NotFound'
import { withAuthentication } from '../Session'
import { HOME, SIGN_IN } from '../../constants/routes'
import './index.scss'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Navigation />
          <Switch>
            <Route path={HOME} component={Home} exact />
            <Route path={SIGN_IN} component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default withAuthentication(App)
