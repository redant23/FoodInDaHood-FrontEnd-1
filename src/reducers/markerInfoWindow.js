import {
  OPEN_MARKER_INFO_WINDOW,
  CLOSE_MARKER_INFO_WINDOW
} from "../constants";

const markerInfoWindowReducer = (state = [], action) => {
  switch (action.type) {
    case OPEN_MARKER_INFO_WINDOW:
      let updatingState = [...state];
      updatingState.push(action.id);
      return updatingState;
    case CLOSE_MARKER_INFO_WINDOW:
      return state.filter(item => item !== action.id);
    default:
      return state;
  }
};

export default markerInfoWindowReducer;
