import {
  UPDATE_SEARCHED_VENDOR_LIST,
  RESET_SEARCHED_VENDOR_LIST
} from "../constants";

const updateSearchedVendorListReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_SEARCHED_VENDOR_LIST:
      return [...action.vendorList];
    case RESET_SEARCHED_VENDOR_LIST:
      return [];
    default:
      return state;
  }
};

export default updateSearchedVendorListReducer;
