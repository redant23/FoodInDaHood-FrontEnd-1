import {
  SET_VENDOR_DETAIL_STATUS_TAP_TO_MENU,
  SET_VENDOR_DETAIL_STATUS_TAP_TO_INFO,
  SET_VENDOR_DETAIL_STATUS_TAP_TO_REVIEW
} from "../constants";

const initialState = {
  menuTap: true,
  infoTap: false,
  reviewTap: false
};

const updateVendorDetailTapStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VENDOR_DETAIL_STATUS_TAP_TO_MENU:
      for (let item in state) {
        if (state[item]) {
          state[item] = !item;
        }
      }
      return { ...state, menuTap: true };
    case SET_VENDOR_DETAIL_STATUS_TAP_TO_INFO:
      for (let item in state) {
        if (state[item]) {
          state[item] = !item;
        }
      }
      return { ...state, infoTap: true };
    case SET_VENDOR_DETAIL_STATUS_TAP_TO_REVIEW:
      for (let item in state) {
        if (state[item]) {
          state[item] = !item;
        }
      }
      return { ...state, reviewTap: true };
    default:
      return state;
  }
};

export default updateVendorDetailTapStatusReducer;
