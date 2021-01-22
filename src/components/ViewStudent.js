import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { removeStudent, updateStudent } from '../actions/students';
import { Button, Container, Col, Row, Image, Form, Input } from 'reactstrap'
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
    //console.log(this.props);
    const { student, students, campuses, campus, deleteStudent, id } = this.props;
    if (this.state.firstName === "redirect") {
      return (<Redirect to={`/students/`}/>)
    }

    if (student && campus !== null) {
    return (
      <Container>
        <div className="mx-auto">
            <img src={student.imageUrl} />


        <div>
          <h5> {student.firstName + " " + student.lastName} </h5>
          <h7> {student.email} </h7>
          <h3> <span className={`badge ${student.gpa > 2.8 ? 'badge-secondary' : student.gpa > 2.0 ? 'badge-warning' : 'badge-danger'}`}> GPA: {student.gpa} </span> </h3>
        </div>
        </div>
        <div>
          <Link to={`/students/edit/${student.id}/`}><Button>Edit</Button></Link>&nbsp;
          <Button onClick={this.delete}>Delete</Button>
        </div>
          <br />
          <br />
        <div>
          {
            student && campus ?
            <Fragment>
            <div>
              <h5> This student is registered to: </h5>
            </div>
            <Row>
              <Col className="mx-auto" xs="12" s="6" m="3" l="3" xl="3"><CardCampus delete={false} name={campus.name} id={campus.id} imageUrl={campus.imageUrl}  /></Col>
            </Row>
            </Fragment>
            :
            <div>
              <h3> This student is not registered to a campus! </h3>
              <h4> Please add them to a Campus: </h4>
            </div>
          }
          {<Form onSubmit={this.update}>
            <Input className="mx-auto" type="select" style={{width: "300px"}}defaultValue={this.state.campusId} onChange={ev => this.setState({ campusId: ev.target.value })}>
              <option value='null'> --- Unenrolled --- </option>
              { campuses.campuses.map(campus => {
                  return <option key={campus.id} value={campus.id}> {campus.name} </option>
                })
              }
            </Input>
            <Button> {campus ? 'Change Campus' : 'Add to Campus'} </Button>
          </Form>}
        </div>
      </Container>
      )
    };
    return null
  };
};


const mapStateToProps = ({students, campuses}, {id}) => {
  //console.log(students.students);
  const student = students.students.find(student => student.id == id);
  //console.log(student)
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
