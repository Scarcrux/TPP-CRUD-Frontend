import React, { Component } from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup, Container, Row } from 'reactstrap';
import { addCampus } from '../actions/campuses';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
class AddCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campus: {
        name: "",
        imageUrl: "",
        address: "",
        description: ""
      },
      redirect: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const updatedCampus = {...this.state.campus}
    const inputField = e.target.id
    const inputValue = e.target.value
    updatedCampus[inputField] = inputValue
    this.setState({campus: updatedCampus})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.addCampus(this.state.campus);
    this.setState({redirect: true})
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/campuses"/>)
    }
    return (
      <Container>
        <br></br><br></br>
        <Row className="d-flex justify-content-center" style={{width:"100%"}}>
          <AvForm onValidSubmit={this.handleSubmit}>
            {/* With AvGroup AvInput and AvFeedback to build your own */}
            <AvGroup>
              <Label for="name">Name</Label>
              <AvInput name="name" type="text" id="name" onChange={this.handleChange} required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter a name.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="address">Address</Label>
              <AvInput name="address" type="textarea" id="address" onChange={this.handleChange} style={{height:"100px"}} required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter an address.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="description">Description</Label>
              <AvInput name="description" type="textarea" id="description" style={{height:"200px", width:"400px"}} onChange={this.handleChange} required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter a description.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="imageUrl">Image URL</Label>
              <AvInput name="imageUrl" type="url" id="imageUrl" onChange={this.handleChange} required />
              {/* this only shows when there is an error, use reactstrap's FormFeedback if you want is to always be displayed */}
              <AvFeedback>Enter a valid URL.</AvFeedback>
            </AvGroup>
            <FormGroup>
              <Button color="success">Submit</Button>
            </FormGroup>
          </AvForm>
          </Row>
          <Row>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCampus: campus => {
      dispatch(addCampus(campus));
    }
  };
};

const connector = connect(null, mapDispatchToProps);
export default connector(AddCampus);
