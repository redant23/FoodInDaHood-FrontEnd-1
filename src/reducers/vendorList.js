import { UPDATE_VENDOR_LIST, RESET_VENDOR_LIST } from "../constants";

const updateVendorListReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_VENDOR_LIST:
      return [...state, ...action.vendorList];
    case RESET_VENDOR_LIST:
      return [];
    default:
      return state;
  }
};

export default updateVendorListReducer;
