import {
  ADD_VENDOR_LIST_PAGE_NUMBER,
  RESET_VENDOR_LIST_PAGE_NUMBER
} from "../constants";

const initialState = {
  startIdx: 0,
  endIdx: 10
};

const updateVendorListPageNumberStatusReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_VENDOR_LIST_PAGE_NUMBER:
      state.startIdx += 10;
      state.endIdx += 10;
      return { ...state };
    case RESET_VENDOR_LIST_PAGE_NUMBER:
      return { startIdx: 0, endIdx: 10 };
    default:
      return state;
  }
};

export default updateVendorListPageNumberStatusReducer;
