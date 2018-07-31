import { UPDATE_AUTHORIZED_USER_DATA } from "../constants";

const initialState = {
  isAuthenticated: false,
  userInfo: null,
  userToken: null
};

const updateAuthorizedUserDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AUTHORIZED_USER_DATA:
      state.isAuthenticated = true;
      state.userInfo = action.userData.userInfo;
      state.userToken = action.userData.userToken;
      return { ...state };
    default:
      return state;
  }
};

export default updateAuthorizedUserDataReducer;
