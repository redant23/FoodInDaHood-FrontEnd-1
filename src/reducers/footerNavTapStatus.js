import {
  SET_MAIN_TAP,
  SET_SEARCH_TAP,
  SET_MY_LIST_TAP,
  SET_EXTRA_TAP
} from "../constants";

const initialState = {
  mainTap: true,
  searchTap: false,
  myListTap: false,
  extraTap: false
};

const updateFooterNavTapStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAIN_TAP:
      for (let item in state) {
        if (state[item]) {
          state[item] = !item;
        }
      }

      return { ...state, mainTap: true };

    case SET_SEARCH_TAP:
      for (let item in state) {
        if (state[item]) {
          state[item] = !item;
        }
      }

      return { ...state, searchTap: true };

    case SET_MY_LIST_TAP:
      for (let item in state) {
        if (state[item]) {
          state[item] = !item;
        }
      }

      return { ...state, myListTap: true };

    case SET_EXTRA_TAP:
      for (let item in state) {
        if (state[item]) {
          state[item] = !item;
        }
      }

      return { ...state, extraTap: true };

    default:
      return state;
  }
};

export default updateFooterNavTapStatusReducer;
