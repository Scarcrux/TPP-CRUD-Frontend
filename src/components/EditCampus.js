import React, { Component, Fragment } from 'react';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup, Container, Row, Col } from 'reactstrap';
import { updateCampus } from '../actions/campuses';
import { updateStudent } from '../actions/students';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
class EditCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campus: {
        name: this.props.campus.name,
        imageUrl: this.props.campus.imageUrl,
        address: this.props.campus.address,
        description: this.props.campus.description,
        id: this.props.campus.id
      },
      student: {},
      redirect: false,
      allCampusesRedirect: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTransferSubmit = this.handleTransferSubmit.bind(this);
  }

  handleChange(e) {
    const updatedCampus = {...this.state.campus}
    const inputField = e.target.id
    const inputValue = e.target.value
    updatedCampus[inputField] = inputValue
    this.setState({campus: updatedCampus})
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(JSON.stringify(this.state))
    this.props.updateCampus(this.state.campus);
    this.setState({redirect: true})
  }

  handleTransferSubmit(e) {
    e.preventDefault();
    const updatedStudent = {...this.state.student}
    const inputField = "campusId"
    const inputValue = this.state.campus.id;
    updatedStudent[inputField] = inputValue
    this.setState({student: updatedStudent})
    this.props.updateStudent(this.state.student);
    this.setState({allCampusesRedirect: true})
  }

  render() {
    if (!this.props.campus) return null
    console.log(this.props)
    if (this.state.redirect) {
      return (<Redirect to={`/campuses/${this.props.id}/`}/>)
    }
    if (this.state.allCampusesRedirect) {
      return (<Redirect to={`/campuses/`}/>)
    }
    const { students } = this.props.students;
    const studentOptions = students.map(student => {
      return <option key={student.id} value={student.id}> {student.firstName + " " + student.lastName} </option>
    });
    return (
      <Fragment>
        <br></br><br></br>
        <Container>
          <Row className="d-flex justify-content-center" style={{width:"100%"}}>
            <AvForm onValidSubmit={this.handleSubmit}>
              {/* With AvGroup AvInput and AvFeedback to build your own */}
              <AvGroup>
                <Label for="name">Name</Label>
                <AvInput
                  name="name"
                  type="text"
                  id="name"
                  value={this.state.campus.name}
                  onChange={this.handleChange} required
                />
                {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                <AvFeedback>Enter a name.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="address">Address</Label>
                <AvInput
                  name="address"
                  type="textarea"
                  id="address"
                  value={this.state.campus.address} onChange={this.handleChange}
                  style={{height:"100px", width:"400px"}} required
                />
                {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                <AvFeedback>Enter an address.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="description">Description</Label>
                <AvInput
                  name="description"
                  type="textarea"
                  id="description"
                  value={this.state.campus.description}
                  style={{height:"200px"}}
                  onChange={this.handleChange} required
                />
                {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                <AvFeedback>Enter a description.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="imageUrl">Image URL</Label>
                <AvInput
                  name="imageUrl"
                  type="url"
                  id="imageUrl"
                  value={this.state.campus.imageUrl}
                  onChange={this.handleChange} required
                />
                {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
                <AvFeedback>Enter a valid URL.</AvFeedback>
              </AvGroup>
              <FormGroup>
                <Button color="primary">Update</Button>
              </FormGroup>
            </AvForm>
            </Row>
        </Container>
        <Container>
          <Row className="d-flex justify-content-center" style={{width:"100%"}}>
            <AvForm onSubmit={this.handleTransferSubmit}>
              <AvGroup>
                <AvField type="select" name="select" label="Assign Student to Campus" onChange={(ev) => this.setState({ student: this.props.students.students.find(student => student.id === ev.target.value*1)})}>
                <option key={0} value={null}> {"Select a Student"} </option>
                  {studentOptions}
                </AvField>
              </AvGroup>
              <FormGroup>
                <Button color="info">Transfer</Button>
              </FormGroup>
              <br></br>
            </AvForm>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ campuses, students }) => {
  const campus = campuses.campuses.find(campus => campus)
  return {
    campus,
    campuses,
    students
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCampus: campus => {
      dispatch(updateCampus(campus));
    },
    updateStudent: student => {
      dispatch(updateStudent(student));
    }
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(EditCampus);
