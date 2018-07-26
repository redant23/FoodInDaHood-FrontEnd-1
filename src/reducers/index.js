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
  vendorListTotalNumber
});
