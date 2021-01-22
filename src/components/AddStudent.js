import React, { Component } from 'react';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup, Container, Row, Col } from 'reactstrap';
import { addStudent } from '../actions/students';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { update } from 'lodash';
class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        firstName: "",
        lastName: "",
        email: "",
        imageUrl: "",
        gpa: null,
        campusId: null
      },
      redirect: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const updatedStudent = {...this.state.student}
    const inputField = e.target.id
    const inputValue = e.target.value
    updatedStudent[inputField] = inputValue

    this.setState({student: updatedStudent})
  }

  handleSubmit(e, errors, values) {
    //this.setState({errors, values});
    //this.props.addCampus(this.state);
    //return (<Redirect to="/campuses"/>)
    e.preventDefault()
   console.log(JSON.stringify(this.state))
    this.props.addStudent(this.state.student);
    this.setState({redirect: true})
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/students"/>)
    }
    const { campuses } = this.props;
//    console.log(campuses)
    const campusOptions = campuses.map(campus => {
      return <option key={campus.id} value={campus.id}> {campus.name} </option>
    });
    return (
      <Container>
        <Row className="d-flex justify-content-center" style={{width:"100%"}}>
          <AvForm onSubmit={this.handleSubmit}>
            {/* With AvGroup AvInput and AvFeedback to build your own */}
            <AvGroup>
              <Label for="firstName">First Name</Label>
              <AvInput name="firstName" type="text" id="firstName" onChange={this.handleChange} required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter a first name.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="lastName">Last Name</Label>
              <AvInput name="lastName" type="text" id="lastName" onChange={this.handleChange} required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter a last name.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="email">E-mail</Label>
              <AvInput name="email" type="email" id="email" onChange={this.handleChange} required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter a valid e-mail address.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="gpa">GPA</Label>
              <AvInput name="gpa" type="number" id="gpa" onChange={this.handleChange} min="0" max="4" required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter a GPA in the range of 0 to 4.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="imageUrl">Image URL</Label>
              <AvInput name="imageUrl" type="url" id="imageUrl" onChange={this.handleChange} required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter a valid URL.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <AvField type="select" name="select" label="Assign Student to a Campus" onChange={this.handleChange} helpMessage="Idk, this is an example. Deal with it!">
              <option key={0} value={null}> {"Select a Campus"} </option>
                {campusOptions}
              </AvField>
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

const mapStateToProps = (state) => ({
  campuses: state.campuses.campuses
});

const mapDispatchToProps = (dispatch) => {
  return {
    addStudent: campus => {
      dispatch(addStudent(campus));
    }
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(AddStudent);
