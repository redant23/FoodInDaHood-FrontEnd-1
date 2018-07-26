import React, { Component } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import SearchPage from "../SearchPage/SearchPage";
import MyListPage from "../MyListPage/MyListPage";
import Footer from "../Footer/Footer";
import "./App.css";

class App extends Component {
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
      <div>
        <Header />
        {this.props.footerNavTapStatus.mainTap && (
          <Main
            isMarkerShown
            updateInitialGeoLocation={this.props.updateInitialGeoLocation}
            initialGeoLocation={this.props.initialGeoLocation}
            vendorList={this.props.vendorList}
            vendorListFilterStatus={this.props.vendorListFilterStatus}
            vendorListPageNumberStatus={this.props.vendorListPageNumberStatus}
            getVendorList_API_Request={this.props.getVendorList_API_Request}
            updateVendorListFilterStatus={
              this.props.updateVendorListFilterStatus
            }
            updateVendorListDistance={this.props.updateVendorListDistance}
            vendorListDistance={this.props.vendorListDistance}
            updateVendorListPageStatus={this.props.updateVendorListPageStatus}
            resetVendorListPageStatus={this.props.resetVendorListPageStatus}
            resetVendorList={this.props.resetVendorList}
            vendorListInfinityScrollStatus={
              this.props.vendorListInfinityScrollStatus
            }
            resumeVendorListInfinityScroll={
              this.props.resumeVendorListInfinityScroll
            }
            vendorListTotalNumber={this.props.vendorListTotalNumber}
          />
        )}
        {this.props.footerNavTapStatus.searchTap && (
          <SearchPage
            _getVendorListSearchRequest={this.props._getVendorListSearchRequest}
            initialGeoLocation={this.props.initialGeoLocation}
            searchedVendorList={this.props.searchedVendorList}
          />
        )}
        {this.props.footerNavTapStatus.myListTap && <MyListPage />}
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
