import React, { Component } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import SearchPage from "../SearchPage/SearchPage";
import Footer from "../Footer/Footer";
import { filterByFavorite, filterByComment } from "../../helpers/filterHelpers";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main
          isMarkerShown
          updateInitialGeoLocation={this.props.updateInitialGeoLocation}
          initialGeoLocation={this.props.initialGeoLocation}
          vendorList={this.props.vendorList}
          vendorListFilterStatus={this.props.vendorListFilterStatus}
          vendorListPageNumberStatus={this.props.vendorListPageNumberStatus}
          getVendorList_API_Request={this.props.getVendorList_API_Request}
          updateVendorListFilterStatus={this.props.updateVendorListFilterStatus}
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
          isScrollLoadingActive={this.props.isScrollLoadingActive}
        />
        <SearchPage />
        <Footer
          updateFooterNavTapStatus={this.props.updateFooterNavTapStatus}
          footerNavTapStatus={this.props.footerNavTapStatus}
        />
      </div>
    );
  }
}

export default App;
