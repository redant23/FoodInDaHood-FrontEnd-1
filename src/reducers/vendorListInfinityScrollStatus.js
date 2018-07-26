import {
  STOP_VENDORLIST_INFINITY_SCROLL,
  RESUME_VENDORLIST_INFINITY_SCROLL
} from "../constants";

const updateVendorListInfinityScrollStatusReducer = (state = true, action) => {
  switch (action.type) {
    case STOP_VENDORLIST_INFINITY_SCROLL:
      return false;
    case RESUME_VENDORLIST_INFINITY_SCROLL:
      return true;
    default:
      return state;
  }
};

export default updateVendorListInfinityScrollStatusReducer;
