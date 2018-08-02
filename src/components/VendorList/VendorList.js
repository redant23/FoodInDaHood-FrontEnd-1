import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getDistanceFromTheTarget } from "../../helpers/filterHelpers";
import { timeConvertor, isOpen } from "../../helpers/timeHelpers";
import "./VendorList.css";

class VendorList extends Component {
  handleClick(ev) {
    this.props.handleClick(ev.currentTarget.dataset.id);
  }

  render() {
    let targetLat = this.props.initialGeoLocation.lat;
    let targetLng = this.props.initialGeoLocation.lng;

    return (
      <ul className="vendor-list">
        {!!this.props.vendorList.length &&
          this.props.vendorList.map((vendor, index) => (
            <Link
              to={`/vendor/detail/${vendor._id}`}
              className="vendor-list-item"
              key={vendor._id}
              data-id={vendor._id}
              onClick={this.handleClick.bind(this)}
            >
              <div className="vendor-list-img-wrapper">
                <img
                  className="vendor-list-img"
                  src={vendor.img_url}
                  alt="img"
                />
              </div>
              <div className="vendor-list-info">
                <div className="vendor-list-title">
                  {index + 1 + ". " + vendor.title}
                </div>
                <div className="vendor-list-count">
                  <span>즐겨찾기: {vendor.favorites.length}</span>
                  <span>댓글: {vendor.comments.length}</span>
                </div>
                <div className="vendor-list-schedule">
                  <span>{timeConvertor(vendor.open_time)}</span>
                  <span>{" - "}</span>
                  <span>{timeConvertor(vendor.close_time)}</span>
                  {isOpen(vendor.open_time, vendor.close_time) ? (
                    <span className="working-status open">영업중</span>
                  ) : (
                    <span className="working-status closed">영업종료</span>
                  )}
                </div>
              </div>
              <div className="vendor-list-detail">
                <div>{vendor.address.split(" ")[1]}</div>
                <div>
                  {getDistanceFromTheTarget(
                    vendor.lat,
                    vendor.lng,
                    targetLat,
                    targetLng
                  )}
                </div>
              </div>
            </Link>
          ))}
      </ul>
    );
  }
}

export default VendorList;
