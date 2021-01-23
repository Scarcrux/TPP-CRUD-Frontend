import { ADD_STUDENT, GET_STUDENTS, REMOVE_STUDENT, UPDATE_STUDENT } from "../constants/";
import axios from 'axios';

export const addStudent = (payload) => {
  return (dispatch) => {
    return axios.post(`https://tpp-crud-backend.herokuapp.com/students`, payload)
      .then(res => res.data)
      .then(json => {
        dispatch({ type: ADD_STUDENT, payload: json })
      })
  };
}

export const getStudents = () => {
  return (dispatch) => {
    return fetch('https://tpp-crud-backend.herokuapp.com/api/students')
      .then(res => res.json())
      .then(json => {
        dispatch({ type: GET_STUDENTS, payload: json });
      })
  };
}

export const removeStudent = (payload) => {
  return (dispatch) => {
    return axios.delete(`https://tpp-crud-backend.herokuapp.com/students/${payload.id}`, payload)
      .then(() => {
        dispatch({ type: REMOVE_STUDENT, payload })
      })
  };
}

export const updateStudent = (payload) => {
  return (dispatch) => {
    console.log("payload" + JSON.stringify(payload))
    return axios.put(`https://tpp-crud-backend.herokuapp.com/students/${payload.id}`, payload)
      .then(() => {
        dispatch({ type: UPDATE_STUDENT, payload })
      })
  };
}
