const initialState = {
  campuses: []
};

function rootReducer(state = initialState, action) {
  if (action.type === "ADD_CAMPUS") {
    return Object.assign({}, state, {
      campuses: state.campuses.concat(action.payload)
    });
  }
  if (action.type === "GET_CAMPUSES") {
    return Object.assign({}, state, {
      campuses: action.payload
    });
  }
  if (action.type === "REMOVE_CAMPUS") {
    const deletedCampus = state.campuses.filter(campus => campus.id !== action.payload.id);
    return Object.assign({}, state, {
      campuses: deletedCampus
    });
  }
  if (action.type === "UPDATE_CAMPUS") {
    const updatedCampus = state.campuses.map(campus => campus.id === action.payload.id ? action.payload : campus);
    return Object.assign({}, state, {
      campuses: updatedCampus
    });
  }
  return state;
};

export default rootReducer;
