import {
  UPDATE_VENDOR_DETAIL_INFO,
  ADD_FAVORITE_IN_VENDOR_DETAILINFO,
  REMOVE_FAVORITE_IN_VENDOR_DETAILINFO
} from "../constants";

const updateVendorDetailInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_VENDOR_DETAIL_INFO:
      return action.vendorInfo;
    case ADD_FAVORITE_IN_VENDOR_DETAILINFO:
      state.favorites.push({ _id: action.customerId });
      return { ...state };
    case REMOVE_FAVORITE_IN_VENDOR_DETAILINFO:
      let updatedFavorites = state.favorites.filter(item => {
        if (item._id !== action.customerId) {
          return item;
        } else {
          return null;
        }
      });
      state.favorites = updatedFavorites;
      return { ...state };
    default:
      return state;
  }
};

export default updateVendorDetailInfoReducer;
