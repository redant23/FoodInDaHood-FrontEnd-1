import { UPDATE_MY_FAVORITE_LIST } from "../constants";

const updateMyFavoriteListReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_MY_FAVORITE_LIST:
      return action.myFavoriteList;
    default:
      return state;
  }
};

export default updateMyFavoriteListReducer;
