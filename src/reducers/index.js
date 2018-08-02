import { combineReducers } from "redux";
import initialGeoLocation from "./initialGeoLocation";
import vendorList from "./vendorList";
import footerNavTapStatus from "./footerNavTapStatus";
import vendorListFilterStatus from "./vendorListFilterStatus";
import vendorListPageNumberStatus from "./vendorListPageNumberStatus";
import vendorListDistance from "./vendorListDistance";
import vendorListInfinityScrollStatus from "./vendorListInfinityScrollStatus";
import isScrollLoadingActive from "./scrollLoadingStatus";
import searchedVendorList from "./searchedVendorList";
import vendorListTotalNumber from "./vendorListTotalNumber";
import vendorDetailInfo from "./vendorDetailInfo";
import vendorDetailId from "./vendorDetailId";
import vendorDetailTapStatus from "./vendorDetailTapStatus";
import authorizedUserData from "./authorizedUserData";
import vendorCommentList from "./vendorCommentList";
import myFavoriteList from "./myFavoriteList";
import searchKeyWord from "./searchKeyWord";
import markerInfoWindow from "./markerInfoWindow";

export default combineReducers({
  initialGeoLocation,
  vendorList,
  footerNavTapStatus,
  vendorListFilterStatus,
  vendorListPageNumberStatus,
  vendorListDistance,
  vendorListInfinityScrollStatus,
  isScrollLoadingActive,
  searchedVendorList,
  vendorListTotalNumber,
  vendorDetailInfo,
  vendorDetailId,
  vendorDetailTapStatus,
  authorizedUserData,
  vendorCommentList,
  myFavoriteList,
  searchKeyWord,
  markerInfoWindow
});
