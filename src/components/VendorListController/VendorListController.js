import React, { Component } from "react";
import VendorList from "../VendorList/VendorList";
import { getDistanceFromLatLonInKm } from "../../helpers/filterHelpers";
import "./VendorListController.css";

class VendorListController extends Component {
  filterByFavorite(vendorList) {
    return vendorList.sort(function (a, b) {
      return b.favorites.length - a.favorites.length;
    });
  }

  filterByComment(vendorList) {
    return vendorList.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  }

  filterByDistance(vendorList) {
    var targetLat = this.props.initialGeoLocation.lat;
    var targetLng = this.props.initialGeoLocation.lng;

    return vendorList.sort(function (a, b) {
      return (
        getDistanceFromLatLonInKm(a.lat, a.lng, targetLat, targetLng) -
        getDistanceFromLatLonInKm(b.lat, b.lng, targetLat, targetLng)
      );
    });
  }

  handleClick(vendorId) {
    this.props.updateVendorDetailId(vendorId);
  }

  render() {

    return (
      <div className="filter-list-controller">
        <div className="vendor-list-total-number">
          <span>검색범위 내 푸드트럭 수 &nbsp;&nbsp;{`${this.props.vendorListTotalNumber} 개`}</span>
        </div>
        {this.props.vendorListFilterStatus.isByDistance &&
          !!this.props.vendorList && (
            <VendorList
              vendorList={this.filterByDistance(this.props.vendorList)}
              initialGeoLocation={this.props.initialGeoLocation}
              isScrollLoadingActive={this.props.isScrollLoadingActive}
              handleClick={this.handleClick.bind(this)}
            />
          )}
        {this.props.vendorListFilterStatus.isByFavorite &&
          !!this.props.vendorList && (
            <VendorList
              vendorList={this.filterByFavorite(this.props.vendorList)}
              initialGeoLocation={this.props.initialGeoLocation}
              isScrollLoadingActive={this.props.isScrollLoadingActive}
              handleClick={this.handleClick.bind(this)}
            />
          )}
        {this.props.vendorListFilterStatus.isByComment &&
          !!this.props.vendorList && (
            <VendorList
              vendorList={this.filterByComment(this.props.vendorList)}
              initialGeoLocation={this.props.initialGeoLocation}
              isScrollLoadingActive={this.props.isScrollLoadingActive}
              handleClick={this.handleClick.bind(this)}
            />
          )}
      </div>
    );
  }
}

export default VendorListController;
