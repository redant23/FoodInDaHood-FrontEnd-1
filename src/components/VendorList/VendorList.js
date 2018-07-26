import React, { Component } from "react";
import { getDistanceFromLatLonInKm } from "../../helpers/filterHelpers";
import moment from "moment";
import "./VendorList.css";

class VendorList extends Component {
  getDistanceFromTheTarget(vendorLat, vendorLng, targetLat, targetLgn) {
    var result = getDistanceFromLatLonInKm(
      vendorLat,
      vendorLng,
      targetLat,
      targetLgn
    );

    return result < 1
      ? parseInt(result * 1000, 10) + "m"
      : result.toFixed(1) + "km";
  }

  render() {
    function timeConvertor(time) {
      return moment(time).format("LT");
    }

    function isOpen(open, close) {
      var result = false;
      var openHour = new Date(open).getHours();
      var closeHour = new Date(close).getHours();
      var currentHour = new Date().getHours();

      if (currentHour > openHour && currentHour < closeHour) {
        result = true;
      }

      return result;
    }

    let targetLat = this.props.initialGeoLocation.lat;
    let targetLng = this.props.initialGeoLocation.lng;

    return (
      <ul className="vendor-list">
        {this.props.vendorList.map((vendor, index) => (
          <li className="vendor-list-item" key={index}>
            <div className="vendor-list-img-wrapper">
              <img className="vendor-list-img" src={vendor.img_url} alt="img" />
            </div>
            <div className="vendor-list-info">
              <div className="vendor-list-title">
                {index + 1 + ". " + vendor.title}
              </div>
              {vendor.food_categories ? (
                <div className="vendor-list-food-categories">
                  <span>{vendor.food_categories[0]}</span>
                  <span>{vendor.food_categories[1]}</span>
                  <span>{vendor.food_categories[2]}</span>
                </div>
              ) : (
                <div>준비중</div>
              )}
              <div className="vendor-list-count">
                <span>즐겨찾기: {vendor.favorites.length}</span>
                <span>댓글: {vendor.comments.length}</span>
              </div>
              <div className="vendor-list-schedule">
                <span>{timeConvertor(vendor.open_time.$date)}</span>
                <span>{" - "}</span>
                <span>{timeConvertor(vendor.close_time.$date)}</span>
                {isOpen(vendor.open_time.$date, vendor.close_time.$date) ? (
                  <span className="working-status open">OPEN</span>
                ) : (
                  <span className="working-status closed">CLOSED</span>
                )}
              </div>
            </div>
            <div className="vendor-list-detail">
              <div>{vendor.address.split(" ")[1]}</div>
              <div>
                {this.getDistanceFromTheTarget(
                  vendor.lat,
                  vendor.lng,
                  targetLat,
                  targetLng
                )}
              </div>
              <div>81점</div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default VendorList;
