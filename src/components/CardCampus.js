import React from 'react';
import {
  Button, Card, CardText, CardBody, CardImg, CardLink,
  CardTitle, CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { removeCampus } from '../actions/campuses';
import { connect } from 'react-redux';

const CardCampus = (props) => {
  function handleRemove () {
    props.removeCampus(props.campus);
  }

  return (
    <div>
      <Card style={{height:"450px"}}>
        <CardImg top width="100%" src={props.imageUrl} alt="Card image cap" />
        <CardBody>
        <Link to={`/campuses/${props.id}/`}><CardTitle tag="h5">{props.name}</CardTitle></Link>
          <Button
            onClick={handleRemove}>Delete
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ campuses }, ownProps) => {
  const campus = campuses.campuses.find(campus => campus.id === ownProps.id)
  return {
    campus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCampus: campusId => {
      dispatch(removeCampus(campusId));
    }
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(CardCampus);
