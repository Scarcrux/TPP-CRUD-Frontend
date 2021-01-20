import React from 'react';
import {
  Button, Card, CardText, CardBody, CardImg, CardLink,
  CardTitle, CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom';

const CardStudent = (props) => {
  return (
    <div>
      <Card style={{height:"450px"}}>
        <CardImg top width="100%" src={props.imageUrl} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{props.firstName + " " + props.lastName}</CardTitle>
          <Link to={`/students/${props.id}/`}><Button>Details</Button></Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardStudent;
