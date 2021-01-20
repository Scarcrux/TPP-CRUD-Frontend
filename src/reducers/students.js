import { del } from "request-promise-native";

const initialState = {
  students: []
};

function studentsReducer(state = initialState, action) {
  if (action.type === "ADD_STUDENT") {
    return Object.assign({}, state, {
      students: state.students.concat(action.payload)
    });
  }
  if (action.type === "GET_STUDENTS") {
    return Object.assign({}, state, {
      students: action.payload
    });
  }
  if (action.type === "REMOVE_STUDENT") {
    const deletedStudent = state.students.filter(student => student.id !== action.payload.id);
    console.log(deletedStudent)
    return Object.assign({}, state, {
      students: deletedStudent
    });
  }
  if (action.type === "UPDATE_STUDENT") {
    const updatedStudent = state.students.map(student => student.id === action.payload.id ? action.payload : student);
    return Object.assign({}, state, {
      students: updatedStudent
    });
  }
  return state;
};

export default studentsReducer;
