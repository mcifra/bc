import {TOGGLE_TEACHER_MODE} from "../constants/action_types";

function commonReducer(state, action) {
  switch (action.type) {
    case TOGGLE_TEACHER_MODE:
      state.teacherMode = !state.teacherMode;
      return state;
    default:
      return state;
  }
}

export default commonReducer;