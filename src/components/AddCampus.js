import React, { Component } from 'react';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup, Container, Row, Col } from 'reactstrap';
import { addCampus } from '../actions/campuses';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { update } from 'lodash';
class AddCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campus: {
        name: "",
        imageUrl: "",
        address: "",
        description: ""
      },
      redirect: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const updatedCampus = {...this.state.campus}
    const inputField = e.target.id
    const inputValue = e.target.value
    updatedCampus[inputField] = inputValue

    this.setState({campus: updatedCampus})
  }

  handleSubmit(e, errors, values) {
    //this.setState({errors, values});
    //this.props.addCampus(this.state);
    //return (<Redirect to="/campuses"/>)
    e.preventDefault()
   console.log(JSON.stringify(this.state))
    this.props.addCampus(this.state.campus);
    this.setState({redirect: true})
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/campuses"/>)
    }
    return (
      <Container>
        <Row className="d-flex justify-content-center" style={{width:"100%"}}>
          <AvForm onValidSubmit={this.handleSubmit}>
            {/* With AvGroup AvInput and AvFeedback to build your own */}
            <AvGroup>
              <Label for="name">Name</Label>
              <AvInput name="name" type="text" id="name" onChange={this.handleChange} required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter a name.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="address">Address</Label>
              <AvInput name="address" type="textarea" id="address" onChange={this.handleChange} style={{height:"100px"}} required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter an address.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="description">Description</Label>
              <AvInput name="description" type="textarea" id="description" style={{height:"200px", width:"400px"}} onChange={this.handleChange} required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter a description.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="imageUrl">Image URL</Label>
              <AvInput name="imageUrl" type="url" id="imageUrl" onChange={this.handleChange} required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter a valid URL.</AvFeedback>
            </AvGroup>
            <FormGroup>
              <Button>Submit</Button>
            </FormGroup>
          </AvForm>
          </Row>
          <Row>
          {this.state && <div >
            <h5>Submission values</h5>
            Values: <pre>{JSON.stringify(this.state, null, 2)}</pre>
          </div>}
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCampus: campus => {
      dispatch(addCampus(campus));
    }
  };
};

const connector = connect(null, mapDispatchToProps);
export default connector(AddCampus);
