import React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { removeCampus } from '../actions/campuses';
import { CardStudent } from '../components'
import { Button, Container, Col, Row } from 'reactstrap'
import { Redirect } from 'react-router-dom'

const ViewCampus = (props) => {
  const [redirect, setRedirect] = useState(false);
  const { students, campuses, id } = props;
  const campus = campuses.campuses.find(campus => campus.id == id )

  if (!campus) return null;
  const studentArr = students.students.filter(student => student.campusId === campus.id);

  const handleDelete = () => {
    props.removeCampus(campus);
    setRedirect(true);
  }

  if (redirect) {
    return (<Redirect to={`/campuses/`}/>)
  }

  return (
    <Container>
      <br></br><br></br>
      <Row>
        <Col><img src={campus.imageUrl} /></Col>
        <Col>
          <Row className="d-flex flex-column">
            <h5> {campus.name} </h5>
          </Row>
          <Row>
            <p> {campus.description} </p>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col> <br></br><h6> {campus.address} </h6></Col>
        <Col><Link to={`/campuses/edit/${campus.id}/`} params={{campus: campus.id}}><Button color="primary">Edit</Button></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={handleDelete} color='warning'>Delete</Button></Col>
      </Row>
      <br></br>
      <Row>
        <Col>
        <br></br><br></br>
          <h5>Students on Campus</h5>
          <br></br>
        </Col>
        <Col>
          <Link to={`/students/add`}><Button color="success"> Add Student </Button></Link>
        </Col>
      </Row>
        <Row>{
          studentArr.length ?
          studentArr.map(student => (
            <Col xs="3" s="3" m="3" l="3" xl="3" className="mb-4"><CardStudent firstName={student.firstName} id={student.id} imageUrl={student.imageUrl} lastName={student.lastName} /></Col>
          ))
          : <Col> There are no students currently enrolled at {campus.name} </Col>
        }
        </Row>
    </Container>
  )
};

const mapStateToProps = ({ campuses, students }) => {
  return {
    campuses,
    students
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCampus: (campus) => dispatch(removeCampus(campus))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewCampus);
