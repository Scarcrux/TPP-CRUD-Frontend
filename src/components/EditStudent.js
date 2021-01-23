import React, { Component } from 'react';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup, Container, Row, Col } from 'reactstrap';
import { updateStudent } from '../actions/students';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
class EditStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        id: this.props.student.id,
        firstName: this.props.student.firstName,
        lastName: this.props.student.lastName,
        email: this.props.student.email,
        imageUrl: this.props.student.imageUrl,
        gpa: this.props.student.gpa,
        campusId: this.props.student.campusId
      },
      redirect: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const updatedStudent = {...this.state.student}
    const inputField = e.target.id
    const inputValue = e.target.value
    updatedStudent[inputField] = inputValue
    this.setState({student: updatedStudent})
  }

  handleIdChange(e) {
    const updatedStudent = {...this.state.student}
    const inputField = e.target.id
    const inputValue = parseInt(e.target.value)
    updatedStudent[inputField] = inputValue
    this.setState({student: updatedStudent})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.updateStudent(this.state.student);
    this.setState({redirect: true})
  }

  render() {
    if (!this.props.student) return null
    if (this.state.redirect) {
      return (<Redirect to={`/students/${this.props.id}/`}/>)
    }
    const { campuses } = this.props;
    const campusOptions = campuses.map(campus => {
      return <option key={campus.id} value={campus.id}> {campus.name} </option>
    });
    return (
      <Container>
        <br></br><br></br>
        <Row className="d-flex justify-content-center" style={{width:"100%"}}>
          <AvForm onValidSubmit={this.handleSubmit}>
            {/* With AvGroup AvInput and AvFeedback to build your own */}
            <AvGroup>
              <Label for="firstName">First Name</Label>
              <AvInput name="firstName" type="text" id="firstName" value={this.state.student.firstName} style={{ width:"400px"}} onChange={this.handleChange} required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter a first name.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="lastName">Last Name</Label>
              <AvInput name="lastName" type="text" id="lastName" value={this.state.student.lastName} onChange={this.handleChange} required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter a last name.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="email">E-mail</Label>
              <AvInput name="email" type="email" id="email" value={this.state.student.email} onChange={this.handleChange} required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter a valid e-mail address.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="gpa">GPA</Label>
              <AvInput name="gpa" type="number" id="gpa" value={this.state.student.gpa} onChange={this.handleChange} min="0" max="4" required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter a GPA in the range of 0 to 4.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="imageUrl">Image URL</Label>
              <AvInput name="imageUrl" type="url" id="imageUrl" value={this.state.student.imageUrl} onChange={this.handleChange} required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter a valid URL.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <AvField type="select" id="campusId" name="select" defaultValue={this.state.student.campusId} label="Campus" onChange={this.handleIdChange}>
              <option value='null'> --- Unenrolled --- </option>
              {campusOptions}
              </AvField>
            </AvGroup>
            <FormGroup>
              <Button color="info">Update</Button>
            </FormGroup>
          </AvForm>
          </Row>
          <Row>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ campuses, students }, {id}) => {
  const student = students.students.find(campus => campus.id == id)
  campuses = campuses.campuses;
  return {
    student,
    campuses,
    id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStudent: campus => {
      dispatch(updateStudent(campus));
    }
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(EditStudent);
