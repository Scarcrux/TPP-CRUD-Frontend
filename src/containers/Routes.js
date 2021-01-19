import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Root } from './'
import { NotFound } from '../components'

class Routes extends Component {
  render () {
    return (
      <Router>
          <Switch>
            <Route exact path="/" component={Root} />
            <Route component={NotFound} />
          </Switch>
      </Router>
    );
  }
}

export default (Routes);
