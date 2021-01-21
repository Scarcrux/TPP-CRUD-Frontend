import { del } from "request-promise-native";

const initialState = {
  campuses: []
};

function campusesReducer(state = initialState, action) {
  if (action.type === "ADD_CAMPUS") {
    return {
      ...state,
      campuses: action.payload
    }
  }
  if (action.type === "GET_CAMPUSES") {
    return {
      ...state,
      campuses: action.payload
    }
  }
  if (action.type === "REMOVE_CAMPUS") {
    const deletedCampus = state.campuses.filter(campus => campus.id !== action.payload.id);
    return {
      ...state,
      campuses: deletedCampus
    }
  }
  if (action.type === "UPDATE_CAMPUS") {
    const updatedCampus = state.campuses.map(campus => campus.id === action.payload.id ? action.payload : campus);
    return {
      ...state,
      campuses: updatedCampus
    }
  }
  return state;
};

export default campusesReducer;
