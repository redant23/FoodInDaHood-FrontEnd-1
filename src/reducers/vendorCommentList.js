import { UPDATE_VENDOR_COMMENT_LIST } from "../constants";

const updateVendorCommentListReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_VENDOR_COMMENT_LIST:
      return action.commentList;
    default:
      return state;
  }
};

export default updateVendorCommentListReducer;
