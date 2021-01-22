import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Campuses, Root, Students } from './'
import { connect } from 'react-redux';
import { AddCampus, AddStudent, EditCampus, EditStudent, Menu, NotFound, ViewCampus, ViewStudent } from '../components'
import { getCampuses } from '../actions/campuses';
import { getStudents } from '../actions/students';
import '../App.css';

class Routes extends Component {
  componentDidMount () {
    this.props.fetchInitialData();
  }

  render () {
    return (
      <Router>
        <Menu />
          <div className="App">
          <Switch>
            <Route exact path="/" component={Root} />
            <Route exact path="/campuses" component={Campuses} />
            <Route exact path="/students" component={Students} />
            <Route exact path="/campuses/add" component={AddCampus} />
            <Route exact path="/students/add" component={AddStudent} />
            <Route path='/campuses/edit/:id' exact render={({match}) =>  <EditCampus id={match.params.id} /> } />
            <Route path='/students/edit/:id' exact render={({match}) =>  <EditStudent id={match.params.id} /> } />
            <Route path='/campuses/:id' exact render={({match}) =>  <ViewCampus id={match.params.id} /> } />
            <Route path='/students/:id' exact render={({match}) =>  <ViewStudent id={match.params.id} /> } />
            <Route component={NotFound} />
          </Switch>
          </div>
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
