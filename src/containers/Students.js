import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addStudent, removeStudent, updateStudent } from '../actions/students'

class Students extends Component {
  handleSubmit = () => {
    const updateTest = this.props.students[1];
    updateTest.firstName = "John";
    //console.log(updateTest)
    this.props.updateStudent(updateTest);
  }

  handleRemove = () => {
    const temp = this.props.students[100]
    this.props.removeStudent(temp);
  }

  handleNewSubmit = () => {
    const updateTest = {
      "firstName": "Jonathan",
      "lastName": "Scarpelli",
      "email": "adele.gimenez@college.edu",
      "imageUrl": "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/16.png",
      "gpa": "3.20",
      "campusId": 14
       }
    this.props.addStudent(updateTest);
  }

  render () {
    const { students } = this.props;
    console.log(students);
    let studentItemArr = [];
    if (students) { studentItemArr = students.map(student => (
      <li key={student.id}>{student.firstName} - {student.lastName} - {student.email} - {student.imageUrl} - {student.gpa} - {student.campusId}</li>
    ))};

    return (
      <div className="container">
        <div className="student-list">
          <ul>{studentItemArr}</ul>
          <div><button onClick={this.handleSubmit}>Test Update</button></div>
          <div><button onClick={this.handleNewSubmit}>Test Create</button></div>
          <div><button onClick={this.handleRemove}>Test Delete</button></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  students: state.students.students
});

const mapDispatchToProps = dispatch => ({
  addStudent: (student) => dispatch(addStudent(student)),
  removeStudent: (student) => dispatch(removeStudent(student)),
  updateStudent: (student) => dispatch(updateStudent(student)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Students);
