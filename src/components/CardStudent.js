import React from 'react';
import {
  Button, Card, CardText, CardBody, CardImg, CardLink,
  CardTitle, CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { removeStudent } from '../actions/students';
import { connect } from 'react-redux';

const CardStudent = (props) => {
  function handleRemove () {
    props.removeStudent(props.student);
  }

  return (
    <div>
      <Card style={{height:"450px"}}>
        <CardImg top width="100%" src={props.imageUrl} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{props.firstName + " " + props.lastName}</CardTitle>
          <Link to={`/students/${props.id}/`}><Button>Details</Button></Link>
          <Button
            onClick={handleRemove}>Delete
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ students }, ownProps) => {
  const student = students.students.find(student => student.id === ownProps.id)
  return {
    student
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeStudent: studentId => {
      dispatch(removeStudent(studentId));
    }
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(CardStudent);
