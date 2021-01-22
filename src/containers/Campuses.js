import React from 'react';
import { connect } from 'react-redux';
import { CardCampus } from '../components'
import { Button, Container, Col, Row } from 'reactstrap'
import { Link } from 'react-router-dom';

const Campuses = (props) => {
  const { campuses, students } = props;

  if (campuses !== "undefined") {
      var campusItemArr = campuses.map(campus => {
      return <Col xs="4" s="4" m="4" l="4" xl="4"><CardCampus id={campus.id} name={campus.name} imageUrl={campus.imageUrl} delete={true} enrolled={students.filter(student => student.campusId === campus.id).length} /></Col>
      });

    return (
      <Container>
              <Link to='campuses/add'><Button className="float-right">Add Campus</Button></Link>
        <Row className="d-flex align-items-center">
          <Col><h5>Campuses</h5></Col>
        </Row>

        <Row>
          {campusItemArr}
        </Row>
          {!campusItemArr && <Row>
            <Col><h5>There are no campuses in the database.</h5></Col>
            </Row>
          }
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  campuses: state.campuses.campuses,
  students: state.students.students
});

const connector = connect(mapStateToProps, null);
export default connector(Campuses);
