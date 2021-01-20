import { ADD_STUDENT, GET_STUDENTS, REMOVE_STUDENT, UPDATE_STUDENT } from "../constants/";
import axios from 'axios';

export const addStudent = (payload) => {
  return (dispatch) => {
    return axios.post(`http://localhost:1337/api/students`, payload)
      .then(res => res.data)
      .then(json => {
        dispatch({ type: ADD_STUDENT, payload: json })
      })
  };
}

export const getStudents = () => {
  return (dispatch) => {
    return fetch('http://localhost:1337/api/students')
      .then(res => res.json())
      .then(json => {
        dispatch({ type: GET_STUDENTS, payload: json });
      })
  };
}

export const removeStudent = (payload) => {
  return (dispatch) => {
    return axios.delete(`http://localhost:1337/api/students/${payload.id}`, payload)
      .then(res => res.data)
      .then(json => {
        dispatch({ type: REMOVE_STUDENT, payload: json })
      })
  };
}

export const updateStudent = (payload) => {
  return (dispatch) => {
    return axios.put(`http://localhost:1337/api/students/${payload.id}`, payload)
      .then(res => res.data)
      .then(json => {
        dispatch({ type: UPDATE_STUDENT, payload: json })
      })
  };
}
