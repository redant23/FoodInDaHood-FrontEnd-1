import {
  SET_FILTER_BY_DISTANCE,
  SET_FILTER_BY_FAVORITE,
  SET_FILTER_BY_COMMENT
} from "../constants";

const initialState = {
  isByDistance: true,
  isByFavorite: false,
  isByComment: false
};

const updateVendorListFilterStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_BY_DISTANCE:
      for (let item in state) {
        if (state[item]) {
          state[item] = !item;
        }
      }

      return { ...state, isByDistance: true };

    case SET_FILTER_BY_FAVORITE:
      for (let item in state) {
        if (state[item]) {
          state[item] = !item;
        }
      }

      return { ...state, isByFavorite: true };

    case SET_FILTER_BY_COMMENT:
      for (let item in state) {
        if (state[item]) {
          state[item] = !item;
        }
      }

      return { ...state, isByComment: true };
    default:
      return state;
  }
};

export default updateVendorListFilterStatusReducer;
