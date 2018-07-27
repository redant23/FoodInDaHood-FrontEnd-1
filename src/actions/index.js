import {
  INITIAL_GEOLOCATION,
  UPDATE_VENDOR_LIST,
  SET_MAIN_TAP,
  SET_SEARCH_TAP,
  SET_MY_LIST_TAP,
  SET_EXTRA_TAP,
  SET_FILTER_BY_DISTANCE,
  SET_FILTER_BY_FAVORITE,
  SET_FILTER_BY_COMMENT,
  ADD_VENDOR_LIST_PAGE_NUMBER,
  RESET_VENDOR_LIST_PAGE_NUMBER,
  UPDATE_VENDOR_LIST_DISTANCE,
  RESET_VENDOR_LIST,
  STOP_VENDORLIST_INFINITY_SCROLL,
  RESUME_VENDORLIST_INFINITY_SCROLL,
  ACTIVATE_SCROLL_LOADING,
  DE_ACTIVATE_SCROLL_LOADING,
  UPDATE_SEARCHED_VENDOR_LIST,
  RESET_SEARCHED_VENDOR_LIST,
  UPDATE_VENDOR_LIST_TOTAL_NUMBER,
  UPDATE_VENDOR_DETAIL_INFO,
  UPDATE_VENDOR_DETAIL_ID,
  SET_VENDOR_DETAIL_STATUS_TAP_TO_MENU,
  SET_VENDOR_DETAIL_STATUS_TAP_TO_INFO,
  SET_VENDOR_DETAIL_STATUS_TAP_TO_REVIEW
} from "../constants";

export const updateInitialGeoLocationAction = initialGeoLocation => ({
  type: INITIAL_GEOLOCATION,
  initialGeoLocation
});

export const updateVendorListAction = vendorList => ({
  type: UPDATE_VENDOR_LIST,
  vendorList
});

export const setFooterNavTapStatusToMainAction = () => ({
  type: SET_MAIN_TAP
});

export const setFooterNavTapStatusToSearchAction = () => ({
  type: SET_SEARCH_TAP
});

export const setFooterNavTapStatusToMyListAction = () => ({
  type: SET_MY_LIST_TAP
});

export const setFooterNavTapStatusToExtraAction = () => ({
  type: SET_EXTRA_TAP
});

export const setVenderListFilterStatusToDistanceAction = () => ({
  type: SET_FILTER_BY_DISTANCE
});

export const setVenderListFilterStatusToFavoriteAction = () => ({
  type: SET_FILTER_BY_FAVORITE
});

export const setVenderListFilterStatusToCommentAction = () => ({
  type: SET_FILTER_BY_COMMENT
});

export const updateVendorListPageStatusAction = () => ({
  type: ADD_VENDOR_LIST_PAGE_NUMBER
});

export const resetVendorListPageStatusAction = () => ({
  type: RESET_VENDOR_LIST_PAGE_NUMBER
});

export const updateVendorListDistanceAction = distance => ({
  type: UPDATE_VENDOR_LIST_DISTANCE,
  distance
});

export const resetVendorListAction = () => ({
  type: RESET_VENDOR_LIST
});

export const stopVendorListInfinityScrollStatusAction = () => ({
  type: STOP_VENDORLIST_INFINITY_SCROLL
});

export const resumeVendorListInfinityScrollAction = () => ({
  type: RESUME_VENDORLIST_INFINITY_SCROLL
});

export const activateScrollLoadingAction = () => ({
  type: ACTIVATE_SCROLL_LOADING
});

export const deactivateScrollLoadingAction = () => ({
  type: DE_ACTIVATE_SCROLL_LOADING
});

export const updateSearchedVendorListAction = vendorList => ({
  type: UPDATE_SEARCHED_VENDOR_LIST,
  vendorList
});

export const resetSearchedVendorListAction = () => ({
  type: RESET_SEARCHED_VENDOR_LIST
});

export const updateVendorListTotalNumberAction = totalNumber => ({
  type: UPDATE_VENDOR_LIST_TOTAL_NUMBER,
  totalNumber
});

export const updateVendorDetailInfoAction = vendorInfo => ({
  type: UPDATE_VENDOR_DETAIL_INFO,
  vendorInfo
});

export const updateVendorDetailIdAction = vendorId => ({
  type: UPDATE_VENDOR_DETAIL_ID,
  vendorId
});

export const setVendorDetailMenuTapStatusToMenuAction = () => ({
  type: SET_VENDOR_DETAIL_STATUS_TAP_TO_MENU
});

export const setVendorDetailMenuTapStatusToInfoAction = () => ({
  type: SET_VENDOR_DETAIL_STATUS_TAP_TO_INFO
});

export const setVendorDetailMenuTapStatusToReviewAction = () => ({
  type: SET_VENDOR_DETAIL_STATUS_TAP_TO_REVIEW
});
