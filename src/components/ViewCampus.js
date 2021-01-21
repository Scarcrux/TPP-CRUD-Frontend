import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCampus } from '../actions/campuses';

const ViewCampus = (props) => {
  console.log(props)
  const { students, campuses, id } = props;
  const campus = campuses.campuses.find(campus => campus.id == id )
  console.log("campus" + campus)
  console.log(campuses.campuses)
  if (!campus) return null;
  const studentArr = students.students.filter(student => student.campusId === campus.id);
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
            <Link to={`/campuses/${campus.id}/edit`} params={{campus: campus.id}}><button className='btn btn-dark'>Edit</button></Link>&nbsp;
            <button onClick={() => props.deleteCampus(campus)} className='btn btn-danger'>Delete</button>
          </div>
        </div>
      </div>
      <div>
        <h1>Students on Campus</h1>
        <Link to={`/students/create`}><button> Add Student </button></Link>
      </div>
      <div>
        <ul>
        {
          studentArr.length ?
          studentArr.map(student => <li>{student.firstName + " " + student.lastName}</li>)
          : <div className='center'> There are no students currently enrolled at {campus.name} </div>
        }
        </ul>
      </div>
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
