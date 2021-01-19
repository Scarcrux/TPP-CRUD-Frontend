'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Campuses extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { campuses } = this.props;
    const campusItemArr = campuses.map(campus => (
      <li key={campus.id}>{campus.name} - {campus.imageUrl} - {campus.address} - {campus.description}</li>
    ));
    return (
      <div className="container">
        <div className="campus-list">
          <ul>{campusItemArr}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  campuses: state.campuses
});

const mapDispatchToProps = dispatch => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Campuses);
