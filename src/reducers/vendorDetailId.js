import { UPDATE_VENDOR_DETAIL_ID } from "../constants";

const updateVendorDetailIdReducer = (state = null, action) => {
  switch (action.type) {
    case UPDATE_VENDOR_DETAIL_ID:
      return action.vendorId;
    default:
      return state;
  }
};

export default updateVendorDetailIdReducer;
