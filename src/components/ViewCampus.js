import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCampus } from '../actions/campuses';
import { CardStudent } from '../components'
import { Container, Col, Row } from 'reactstrap'

const ViewCampus = (props) => {
  console.log(props)
  const { students, campuses, id } = props;
  const campus = campuses.campuses.find(campus => campus.id == id )
  console.log("campus" + campus)
  console.log(campuses.campuses)
  if (!campus) return null;
  const studentArr = students.students.filter(student => student.campusId === campus.id);
  const studentItemArr = studentArr.map(student => (
    <Col xs="12" s="6" m="3" l="3" xl="3"><CardStudent firstName={student.firstName} id={student.id} imageUrl={student.imageUrl} lastName={student.lastName} /></Col>
  ));
  return (
    <div>
      <div>
        <img src={campus.imageUrl} />
        <div>
          <div>
            <h1> {campus.name} </h1>
            <p> {campus.description} </p>
            <h5> Located At: </h5>
            <h6> {campus.address} </h6>
          </div>
          <div>
            <Link to={`/campuses/edit/${campus.id}/`} params={{campus: campus.id}}><button className='btn btn-dark'>Edit</button></Link>&nbsp;
            <button onClick={() => props.deleteCampus(campus)} className='btn btn-danger'>Delete</button>
          </div>
        </div>
      </div>
      <div>
        <h1>Students on Campus</h1>
        <Link to={`/students/add`}><button> Add Student </button></Link>
      </div>
      <Container>
        <Row>
        {
          studentArr.length ?
          studentArr.map(student => (
            <Col xs="12" s="6" m="3" l="3" xl="3"><CardStudent firstName={student.firstName} id={student.id} imageUrl={student.imageUrl} lastName={student.lastName} /></Col>
          ))
          : <div className='center'> There are no students currently enrolled at {campus.name} </div>
        }
        </Row>
      </Container>
    </div>
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
