import React, { Component } from "react";
import classNames from "classnames";
import VendorList from "../VendorList/VendorList";
import { getDistanceFromLatLonInKm } from "../../helpers/filterHelpers";
import "./VendorListController.css";

class VendorListController extends Component {
  filterByFavorite(vendorList) {
    return vendorList.sort(function(a, b) {
      return b.favorites.length - a.favorites.length;
    });
  }

  filterByComment(vendorList) {
    return vendorList.sort(function(a, b) {
      return b.comments.length - a.comments.length;
    });
  }

  filterByDistance(vendorList) {
    var targetLat = this.props.initialGeoLocation.lat;
    var targetLng = this.props.initialGeoLocation.lng;

    return vendorList.sort(function(a, b) {
      return (
        getDistanceFromLatLonInKm(a.lat, a.lng, targetLat, targetLng) -
        getDistanceFromLatLonInKm(b.lat, b.lng, targetLat, targetLng)
      );
    });
  }

  render() {
    return (
      <div className="filter-list-controller">
        {this.props.vendorListFilterStatus.isByDistance && (
          <VendorList
            vendorList={this.filterByDistance(this.props.vendorList)}
            initialGeoLocation={this.props.initialGeoLocation}
            isScrollLoadingActive={this.props.isScrollLoadingActive}
          />
        )}
        {this.props.vendorListFilterStatus.isByFavorite && (
          <VendorList
            vendorList={this.filterByFavorite(this.props.vendorList)}
            initialGeoLocation={this.props.initialGeoLocation}
            isScrollLoadingActive={this.props.isScrollLoadingActive}
          />
        )}
        {this.props.vendorListFilterStatus.isByComment && (
          <VendorList
            vendorList={this.filterByComment(this.props.vendorList)}
            initialGeoLocation={this.props.initialGeoLocation}
            isScrollLoadingActive={this.props.isScrollLoadingActive}
          />
        )}
      </div>
    );
  }
}

export default VendorListController;
