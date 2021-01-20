import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCampus } from '../actions/campuses';

const ViewCampus = (props) => {
  const { campus, students } = props;
  if (!campus) return null;
  const studentArr = students.students.filter(student => student.campusId === campus.id);
  return (
    <div className='navMargin'>
      <div id='campusDetail'>
        <img className='campusImage' src={campus.imageUrl} />
        <div className='campusInfo'>
          <div>
            <h1> {campus.name} </h1>
            <p> {campus.description} </p>
            <h5> Located At: </h5>
            <h6> {campus.address} </h6>
          </div>
          <div className='campusButtons'>
            <Link to={`/campuses/${campus.id}/edit`} params={{campus: campus.id}}><button className='btn btn-dark'>Edit</button></Link>&nbsp;
            <button onClick={() => props.deleteCampus(campus)} className='btn btn-danger'>Delete</button>
          </div>
        </div>
      </div>
      <div id='campusStudents'>
        <h1 className='listTitle'>Students on Campus</h1>
        <Link to={`/students/create`}><button className='btn btn-light addButton'> Add Student </button></Link>
      </div>
      <div className='studentsPadding studentsList'>
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

const mapStateToProps = ({ campuses, students }, ownProps) => {
  const campus = campuses.campuses.find(campus => campus.id === ownProps.id*1 )
  return {
    campus,
    students
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCampus: (campus) => dispatch(removeCampus(campus))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewCampus);
