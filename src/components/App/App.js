import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import VendorDetail from "../VendorDetail/VendorDetail";
import SearchPage from "../SearchPage/SearchPage";
import MyListPage from "../MyListPage/MyListPage";
import Footer from "../Footer/Footer";
import Registration from "../Registration/Registration";
import axios from "axios";

import "./App.css";

class App extends Component {
  componentDidMount() {
    var options = {
      enableHighAccuracy: false,
      maximumAge: 30000,
      timeout: 5000
    };

    function success(pos) {
      console.log("navigator geolocation");
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

    var tryAPIGeolocation = function() {
      axios
        .post(
          "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDLoqJ1W1fexc-GcnUjpxPw41NxZYRKDhk"
        )
        .then(res => {
          console.log("api geolocation");
          let initialGeoLocation = {
            lat: res.data.location.lat,
            lng: res.data.location.lng
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
        })
        .catch(err => {
          console.log("failed to get API Geolocation", err);
        });
    };

    function error(error) {
      switch (error.code) {
        case error.TIMEOUT:
          console.log("Browser geolocation error! Timeout.");
          tryAPIGeolocation.call(this);
          break;
        case error.PERMISSION_DENIED:
          if (error.message.indexOf("Only secure origins are allowed") === 0) {
            tryAPIGeolocation.call(this);
          }
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Browser geolocation error! Position unavailable.");
          tryAPIGeolocation.call(this);
          break;
        default:
          break;
      }
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
                isAuthenticated={this.props.isAuthenticated}
                _userSignInSignUpRequest={this.props._userSignInSignUpRequest}
                _updateUserCommentRequest={this.props._updateUserCommentRequest}
                authorizedUserData={this.props.authorizedUserData}
                _getVendorCommentListRequest={
                  this.props._getVendorCommentListRequest
                }
                vendorCommentList={this.props.vendorCommentList}
                _addFavoriteRequest={this.props._addFavoriteRequest}
                _removeFavoriteRequest={this.props._removeFavoriteRequest}
                updateSearchKeyWord={this.props.updateSearchKeyWord}
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
                updateFooterNavTapStatus={this.props.updateFooterNavTapStatus}
                markerInfoWindow={this.props.markerInfoWindow}
                updateMarkerInfoWindowStatus={
                  this.props.updateMarkerInfoWindowStatus
                }
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
                updateFooterNavTapStatus={this.props.updateFooterNavTapStatus}
                searchKeyWord={this.props.searchKeyWord}
                updateSearchKeyWord={this.props.updateSearchKeyWord}
              />
            );
          }}
        />
        <Route
          path="/mylist"
          render={() => {
            return (
              <MyListPage
                isAuthenticated={this.props.isAuthenticated}
                _userSignInSignUpRequest={this.props._userSignInSignUpRequest}
                authorizedUserData={this.props.authorizedUserData}
                initialGeoLocation={this.props.initialGeoLocation}
                _getCustomerFavoriteListRequest={
                  this.props._getCustomerFavoriteListRequest
                }
                myFavoriteList={this.props.myFavoriteList}
                updateVendorDetailId={this.props.updateVendorDetailId}
                updateFooterNavTapStatus={this.props.updateFooterNavTapStatus}
              />
            );
          }}
        />
        <Route
          path="/admin/registration"
          render={() => {
            return (
              <Registration
                _vendorRegistrationRequest={
                  this.props._vendorRegistrationRequest
                }
              />
            );
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
