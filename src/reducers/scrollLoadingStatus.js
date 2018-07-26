import {
  ACTIVATE_SCROLL_LOADING,
  DE_ACTIVATE_SCROLL_LOADING
} from "../constants";

const scrollLoadingStatusReducer = (state = false, action) => {
  switch (action.type) {
    case ACTIVATE_SCROLL_LOADING:
      return true;
    case DE_ACTIVATE_SCROLL_LOADING:
      return false;
    default:
      return state;
  }
};

export default scrollLoadingStatusReducer;
