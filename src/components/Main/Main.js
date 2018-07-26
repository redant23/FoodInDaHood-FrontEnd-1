import React, { Component } from "react";
import _ from "lodash";
import MapWrapper from "../MapWrapper/MapWrapper";
import FilterBox from "../FilterBox/FilterBox";
import VendorListController from "../VendorListController/VendorListController";
import "./Main.css";

class Main extends Component {
  constructor(props) {
    super(props);

    this.handleScroll = _.debounce(this.handleScroll.bind(this), 500, {
      leading: true,
      tailing: false
    });
  }
  componentDidMount() {
    var options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;

      let initialGeoLocation = {
        lat: crd.latitude,
        lng: crd.longitude
      };

      var startIdx = this.props.vendorListPageNumberStatus.startIdx;
      var endIdx = this.props.vendorListPageNumberStatus.endIdx;

      this.props.updateInitialGeoLocation(initialGeoLocation);
      this.props.getVendorList_API_Request(
        initialGeoLocation,
        500,
        startIdx,
        endIdx
      );
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(
      success.bind(this),
      error.bind(this),
      options
    );

    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(ev) {
    var hasMoreData = this.props.vendorListInfinityScrollStatus;

    if (!hasMoreData) {
      return;
    }

    var _windowHeight = window.innerHeight;
    var _scrollPos = window.scrollY;

    var geoLocation = this.props.initialGeoLocation;
    var distance = this.props.vendorListDistance;
    var startIdx = this.props.vendorListPageNumberStatus.startIdx;
    var endIdx = this.props.vendorListPageNumberStatus.endIdx;

    if (
      _scrollPos !== 0 &&
      _windowHeight + _scrollPos + 1 >= document.body.offsetHeight
    ) {
      this.props.getVendorList_API_Request(
        geoLocation,
        distance,
        startIdx + 10,
        endIdx + 10
      );
    }
  }

  handleUpdateVendorListDistance(distance) {
    let currentGeoLocation = this.props.initialGeoLocation;

    this.props.resumeVendorListInfinityScroll();
    this.props.updateVendorListDistance(distance);
    this.props.resetVendorListPageStatus();
    this.props.resetVendorList();
    this.props.getVendorList_API_Request(currentGeoLocation, distance, 0, 10);
  }

  handleUpdateVendorListFilterStatus(type) {
    this.props.updateVendorListFilterStatus(type);
  }

  render() {
    return (
      <div className="main-page">
        <div>
          <MapWrapper
            isMarkerShown
            initialGeoLocation={this.props.initialGeoLocation}
            vendorList={this.props.vendorList}
          />
          <FilterBox
            onDistanceClick={this.handleUpdateVendorListDistance.bind(this)}
            handleUpdateVendorListFilterStatus={this.handleUpdateVendorListFilterStatus.bind(
              this
            )}
            vendorListDistance={this.props.vendorListDistance}
            vendorListFilterStatus={this.props.vendorListFilterStatus}
          />
          {this.props.initialGeoLocation &&
            !!this.props.vendorList && (
              <VendorListController
                initialGeoLocation={this.props.initialGeoLocation}
                vendorList={this.props.vendorList}
                vendorListFilterStatus={this.props.vendorListFilterStatus}
                isScrollLoadingActive={this.props.isScrollLoadingActive}
              />
            )}
        </div>
        {this.props.isScrollLoadingActive && (
          <div className="vendor-list-loading" />
        )}
      </div>
    );
  }
}

export default Main;
