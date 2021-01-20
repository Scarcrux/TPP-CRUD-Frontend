import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCampus, removeCampus, updateCampus } from '../actions/campuses'
import { CardCampus } from '../components'
import { Container, Col, Row } from 'reactstrap'

class Campuses extends Component {

  handleSubmit = () => {
    const updateTest = this.props.campuses[1];
    updateTest.name = "Test College";
    //console.log(updateTest)
    this.props.updateCampus(updateTest);
  }

  handleRemove = () => {
    const temp = this.props.campuses[20]
    this.props.removeCampus(temp);
  }

  handleNewSubmit = () => {
    const updateTest = {
      "name" : "Test College",
      "imageUrl" : "http://placeimg.com/640/480/cats",
      "address" : "1143 Nuvem Ter, East Karleyport, ND 44998",
      "description" : "Velit neque provident itaque. Quisquam vitae unde consequatur itaque facilis perspiciatis eum consequatur. Non totam hic quaerat rerum. Sit tempore doloremque nesciunt quis praesentium et asperiores. Voluptatum odio corrupti aut harum ipsum ut aperiam sunt illum. Maiores autem consectetur aut amet possimus doloribus est. Ducimus magnam impedit sed modi illum iste quo voluptatum. Laborum quos qui. Fuga id et dolor enim saepe qui voluptatem inventore animi. Ut voluptates sint."
   }
    this.props.addCampus(updateTest);
  }

  render () {
    const { campuses } = this.props;
   // console.log(campuses)
    if (campuses !== "undefined") {
       var campusItemArr = campuses.map(campus => (
        <Col xs="4" s="4" m="4" l="4" xl="4"><CardCampus id={campus.id} name={campus.name} imageUrl={campus.imageUrl} /></Col>
    ));
    }
    return (
      <Container>
        <Row>
          {campusItemArr}
          <div><button onClick={this.handleSubmit}>Test Update</button></div>
          <div><button onClick={this.handleNewSubmit}>Test Create</button></div>
          <div><button onClick={this.handleRemove}>Test Delete</button></div>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  campuses: state.campuses.campuses
});

const mapDispatchToProps = dispatch => {
  return {
    addCampus: (campus) => dispatch(addCampus(campus)),
    removeCampus: (campus) => dispatch(removeCampus(campus)),
    updateCampus: (campus) => dispatch(updateCampus(campus)),
  }
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Campuses);
