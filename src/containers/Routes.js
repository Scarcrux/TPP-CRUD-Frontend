import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Campuses, Root, Students } from './'
import { connect } from 'react-redux';
import { Menu, NotFound, ViewCampus, ViewStudent } from '../components'
import { getCampuses } from '../actions/campuses';
import { getStudents } from '../actions/students';

class Routes extends Component {
  componentDidMount () {
    this.props.fetchInitialData();
  }

  render () {
    return (
      <Router>
        <Menu />
          <Switch>
            <Route exact path="/" component={Root} />
            <Route exact path="/campuses" component={Campuses} />
            <Route exact path="/students" component={Students} />
            <Route path='/campuses/:id' exact render={({match}) =>  <ViewCampus id={match.params.id} /> } />
            <Route path='/students/:id' exact render={({match}) =>  <ViewStudent id={match.params.id} /> } />
            <Route component={NotFound} />
          </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  fetchInitialData: () => {
    dispatch(getCampuses());
    dispatch(getStudents());
  }
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Routes);
