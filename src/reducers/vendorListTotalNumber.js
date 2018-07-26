import { UPDATE_VENDOR_LIST_TOTAL_NUMBER } from "../constants";

const updateVendorListTotalNumber = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_VENDOR_LIST_TOTAL_NUMBER:
      return action.totalNumber;
    default:
      return state;
  }
};

export default updateVendorListTotalNumber;
