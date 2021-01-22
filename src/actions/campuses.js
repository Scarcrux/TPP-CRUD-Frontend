import { ADD_CAMPUS, GET_CAMPUSES, REMOVE_CAMPUS, UPDATE_CAMPUS } from "../constants/";
import axios from 'axios';

export const addCampus = (payload) => {
  return (dispatch) => {
    return axios.post(`https://tpp-crud-backend.herokuapp.com//campuses`, payload)
      .then(res => res.data)
      .then(json => {
        dispatch({ type: ADD_CAMPUS, payload: json })
      })
  };
}

export const getCampuses = () => {
  return (dispatch) => {
    return fetch('https://tpp-crud-backend.herokuapp.com/campuses')
      .then(res => res.json())
      .then(json => {
        dispatch({ type: GET_CAMPUSES, payload: json });
      })
  };
}

export const removeCampus = (payload) => {
  return (dispatch) => {
    return axios.delete(`https://tpp-crud-backend.herokuapp.com/campuses/${payload.id}`, payload)
      .then(() => {
        dispatch({ type: REMOVE_CAMPUS, payload })
      })
  };
}

export const updateCampus = (payload) => {
  return (dispatch) => {
    return axios.put(`https://tpp-crud-backend.herokuapp.com/campuses/${payload.id}`, payload)
      .then(() => {
        dispatch({ type: UPDATE_CAMPUS, payload })
      })
  };
}
