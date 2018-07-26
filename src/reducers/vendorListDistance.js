import { UPDATE_VENDOR_LIST_DISTANCE } from "../constants";

const updateVendorListDistanceReducer = (state = 500, action) => {
  switch (action.type) {
    case UPDATE_VENDOR_LIST_DISTANCE:
      return action.distance;
    default:
      return state;
  }
};

export default updateVendorListDistanceReducer;
