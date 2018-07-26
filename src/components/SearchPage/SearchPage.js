import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import VendorList from "../VendorList/VendorList";
import "./SearchPage.css";

class SearchPage extends Component {
  handleChange(keyWord) {
    this.props._getVendorListSearchRequest(keyWord);
  }

  render() {
    return (
      <div className="search-page">
        <SearchBar onChangeInput={this.handleChange.bind(this)} />
        {this.props.initialGeoLocation &&
          this.props.searchedVendorList && (
            <VendorList
              vendorList={this.props.searchedVendorList}
              initialGeoLocation={this.props.initialGeoLocation}
            />
          )}
      </div>
    );
  }
}

export default SearchPage;
