import { UPDATE_SEARCH_KEY_WORD } from "../constants";

const updateSearchKeywordReducer = (state = "", action) => {
  switch (action.type) {
    case UPDATE_SEARCH_KEY_WORD:
      return action.foodName;
    default:
      return state;
  }
};

export default updateSearchKeywordReducer;
