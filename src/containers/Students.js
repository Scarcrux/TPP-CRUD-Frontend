import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addStudent } from '../actions/students'
import { CardStudent } from '../components'
import { Container, Col, Row, Button } from 'reactstrap'
import { Link } from 'react-router-dom';

class Students extends Component {
  render () {
    const { students } = this.props;
    let studentItemArr = [];
    if (students) { studentItemArr = students.map(student => (
      <Col xs="12" s="6" m="3" l="3" xl="3" className="mb-4"><CardStudent firstName={student.firstName} id={student.id} imageUrl={student.imageUrl} lastName={student.lastName} /></Col>
    ))};

    return (
      <Container>
        <br></br>
        <Link to='students/add'><Button className="float-right" color="success">Add Student</Button></Link>
        <Row className="d-flex align-items-center">
          <Col><h5>Students</h5></Col>
        </Row>
        <br></br>
        <Row>
          {studentItemArr}
        </Row>
        {!studentItemArr && <Row>
          <Col><h5>There are no students in the database.</h5></Col>
          </Row>
        }
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  students: state.students.students
});

const mapDispatchToProps = dispatch => ({
  addStudent: (student) => dispatch(addStudent(student)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Students);
