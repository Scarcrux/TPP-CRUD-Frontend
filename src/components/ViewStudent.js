import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeStudent, updateStudent } from '../actions/students';

class ViewStudent extends Component {
  constructor(props){
    super(props);
    this.state = this.props.student;
    this.update = this.update.bind(this);
  };

  componentWillReceiveProps(nextProps){
    this.setState(nextProps.student);
  };

  update(ev){
    ev.preventDefault();
    this.props.updateStudent(this.state);
  };

  render(){
    console.log(this.props);
    const { student, students, campuses, campus, deleteStudent, id } = this.props;
    if (student && campus !== null) {
    return (
      <div>
              <img src={student.imageUrl} />
              <div>
                <h3> {student.firstName + " " + student.lastName} </h3>
                <h3> {student.email} </h3>
                <h3> <span className={`badge ${student.gpa > 2.8 ? 'badge-secondary' : student.gpa > 2.0 ? 'badge-warning' : 'badge-danger'}`}> GPA: {student.gpa} </span> </h3>
              </div>
              <div>
                <Link to={`/students/edit/${student.id}/`}><button>Edit</button></Link>&nbsp;
                <button onClick={() => deleteStudent(student)}>Delete</button>
              </div>
          <br />
          <br />
        <div>
          {
            student && campus ?
            <div>
              <h4> This student is registered to: </h4>
              <div>
                <ul>
                <li>{campus.name}</li>
                </ul>
              </div>
            </div>
            :
            <div>
              <h3> This student is not registered to a campus! </h3>
              <h4> Please add them to a Campus: </h4>
            </div>
          }
          {<form onSubmit={this.update}>
            <select defaultValue={this.state.campusId} onChange={ev => this.setState({ campusId: ev.target.value })}>
              <option value='null'> --- Unenrolled --- </option>
              { campuses.campuses.map(campus => {
                  return <option key={campus.id} value={campus.id}> {campus.name} </option>
                })
              }
            </select>
            <button> {campus ? 'Change Campus' : 'Add to Campus'} </button>
          </form>}
        </div>
      </div>
      )
    };
    return null
  };
};


const mapStateToProps = ({students, campuses}, {id}) => {
  //console.log(students.students);
  const student = students.students.find(student => student.id == id);
  //console.log(student)
  const campus = student ? campuses.campuses.find(campus => campus.id == student.campusId) : null;
  return {
    students,
    student,
    campuses,
    campus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeStudent: (student) => dispatch(removeStudent(student)),
    updateStudent: (student) => dispatch(updateStudent(student))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewStudent);
