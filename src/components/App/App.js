import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import MainLoadingPage from "../MainLoadingPage/MainLoadingPage";
import Header from "../Header/Header";
import Main from "../Main/Main";
import VendorDetail from "../VendorDetail/VendorDetail";
import SearchPage from "../SearchPage/SearchPage";
import MyListPage from "../MyListPage/MyListPage";
import EventPage from "../EventPage/EventPage";
import Footer from "../Footer/Footer";

import "./App.css";

class App extends Component {
  componentDidMount() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;

      let initialGeoLocation = {
        lat: crd.latitude,
        lng: crd.longitude
      };

      var distance = this.props.vendorListDistance;
      var startIdx = this.props.vendorListPageNumberStatus.startIdx;
      var endIdx = this.props.vendorListPageNumberStatus.endIdx;

      this.props.updateInitialGeoLocation(initialGeoLocation);

      this.props.getVendorList_API_Request(
        initialGeoLocation,
        distance,
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
  }

  render() {
    return (
      <div className="app-page">
        <Header />
        <Route
          path="/vendor/detail/:id"
          render={routeProps => {
            return (
              <VendorDetail
                history={routeProps.history}
                _getVendorDetailInfoRequest={
                  this.props._getVendorDetailInfoRequest
                }
                vendorDetailInfo={this.props.vendorDetailInfo}
                vendorDetailId={this.props.vendorDetailId}
                updateVendorDetailMenuTapStatus={
                  this.props.updateVendorDetailMenuTapStatus
                }
                vendorDetailTapStatus={this.props.vendorDetailTapStatus}
                initialGeoLocation={this.props.initialGeoLocation}
              />
            );
          }}
        />
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Main
                isMarkerShown
                updateInitialGeoLocation={this.props.updateInitialGeoLocation}
                initialGeoLocation={this.props.initialGeoLocation}
                vendorList={this.props.vendorList}
                vendorListFilterStatus={this.props.vendorListFilterStatus}
                vendorListPageNumberStatus={
                  this.props.vendorListPageNumberStatus
                }
                getVendorList_API_Request={this.props.getVendorList_API_Request}
                updateVendorListFilterStatus={
                  this.props.updateVendorListFilterStatus
                }
                updateVendorListDistance={this.props.updateVendorListDistance}
                vendorListDistance={this.props.vendorListDistance}
                updateVendorListPageStatus={
                  this.props.updateVendorListPageStatus
                }
                resetVendorListPageStatus={this.props.resetVendorListPageStatus}
                resetVendorList={this.props.resetVendorList}
                vendorListInfinityScrollStatus={
                  this.props.vendorListInfinityScrollStatus
                }
                resumeVendorListInfinityScroll={
                  this.props.resumeVendorListInfinityScroll
                }
                vendorListTotalNumber={this.props.vendorListTotalNumber}
                updateVendorDetailId={this.props.updateVendorDetailId}
              />
            );
          }}
        />
        <Route
          path="/search"
          render={() => {
            return (
              <SearchPage
                _getVendorListSearchRequest={
                  this.props._getVendorListSearchRequest
                }
                initialGeoLocation={this.props.initialGeoLocation}
                searchedVendorList={this.props.searchedVendorList}
                updateVendorDetailId={this.props.updateVendorDetailId}
              />
            );
          }}
        />
        <Route
          path="/mylist"
          render={() => {
            return <MyListPage />;
          }}
        />
        <Route
          path="/event"
          render={() => {
            return <EventPage />;
          }}
        />
        <Footer
          updateFooterNavTapStatus={this.props.updateFooterNavTapStatus}
          footerNavTapStatus={this.props.footerNavTapStatus}
        />
        {this.props.isScrollLoadingActive && (
          <div className="vendor-list-loading" />
        )}
      </div>
    );
  }
}

export default App;
