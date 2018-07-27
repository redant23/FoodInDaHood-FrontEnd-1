import { UPDATE_VENDOR_DETAIL_INFO } from "../constants";

const updateVendorDetailInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_VENDOR_DETAIL_INFO:
      return action.vendorInfo;
    default:
      return state;
  }
};

export default updateVendorDetailInfoReducer;
