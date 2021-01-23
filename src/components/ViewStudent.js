import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { removeStudent, updateStudent } from '../actions/students';
import { Button, Container, Col, Row, Form, Input } from 'reactstrap'
import { CardCampus } from '../components'
class ViewStudent extends Component {
  constructor(props){
    super(props);
    this.state = this.props.student;
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  };

  componentWillReceiveProps(nextProps){
    this.setState(nextProps.student);
  };

  update(ev){
    ev.preventDefault();
    this.props.updateStudent(this.state);
  };

  delete(ev){
    ev.preventDefault();
    console.log(JSON.stringify(this.state))
    this.props.removeStudent(this.state);
    this.setState({firstName:"redirect"})
  };

  render(){
    const { student, campuses, campus } = this.props;
    if (this.state.firstName === "redirect") {
      return (<Redirect to={`/students/`}/>)
    }
    if (student && campus !== null) {
    return (
      <Container>
        <br></br>
        <br></br>
        <div className="mx-auto">
          <img style={{width: "300px", height: "300px"}} src={student.imageUrl} />
          <div>
          <br></br>
            <h5> {student.firstName + " " + student.lastName} </h5>
            <h7> {student.email} </h7>
            <br></br>
            <br></br>
            <h3> <span className={`badge ${student.gpa > 2.8 ? 'badge-secondary' : student.gpa > 2.0 ? 'badge-warning' : 'badge-danger'}`}> GPA: {student.gpa} </span> </h3>
          </div>
        </div>
        <br></br>
        <div>
          <Link to={`/students/edit/${student.id}/`}><Button color="primary">Edit</Button></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={this.delete} color="warning">Delete</Button>
        </div>
          <br />
          <br />
        <div>
          {student && campus ?
            <Fragment>
              <div>
                <h5> This student is registered to: </h5>
              </div>
              <Row>
                <Col className="mx-auto" xs="12" s="6" m="3" l="3" xl="3"><CardCampus delete={false} name={campus.name} id={campus.id} imageUrl={campus.imageUrl} /></Col>
              </Row>
              <br></br>
            </Fragment>
            :
            <div>
              <h5>This student is not registered to a campus! </h5>
              <h5>Please add the student to a campus: </h5>
            </div>
          }
          {<Form onSubmit={this.update}>
            <Input className="mx-auto" type="select" style={{width: "300px"}}defaultValue={this.state.campusId} onChange={ev => this.setState({ campusId: ev.target.value })}>
              <option value='null'> --- Unenrolled --- </option>
              {campuses.campuses.map(campus => {
                  return <option key={campus.id} value={campus.id}> {campus.name} </option>
                })
              }
            </Input>
            <br></br>
            <Button color="info"> {campus ? 'Transfer Campus' : 'Add to Campus'} </Button>
          </Form>}
          <br></br>
        </div>
      </Container>
      )
    };
    return null
  };
};

const mapStateToProps = ({students, campuses}, {id}) => {
  const student = students.students.find(student => student.id == id);
  const campus = student ? campuses.campuses.find(campus => campus.id == student.campusId) : null;
  return {
    students,
    student,
    campuses,
    campus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeStudent: (student) => dispatch(removeStudent(student)),
    updateStudent: (student) => dispatch(updateStudent(student))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewStudent);
