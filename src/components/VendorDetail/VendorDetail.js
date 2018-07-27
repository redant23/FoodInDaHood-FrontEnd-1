import React, { Component, Fragment } from "react";
import { timeConvertor, isOpen } from "../../helpers/timeHelpers";
import { getDistanceFromTheTarget } from "../../helpers/filterHelpers";
import Header from "../Header/Header";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import "./VendorDetail.css";

const SimpleMap = withScriptjs(
  withGoogleMap(props => {
    var lat = props.position.lat;
    var lng = props.position.lng;

    return (
      <GoogleMap defaultZoom={17} defaultCenter={{ lat, lng }}>
        {props.isMarkerShown && (
          <Marker icon={props.icon} position={{ lat, lng }} />
        )}
      </GoogleMap>
    );
  })
);

class VendorDetail extends Component {
  componentDidMount() {
    this.props._getVendorDetailInfoRequest(this.props.vendorDetailId);
  }

  handleGetBackBtnClick() {
    this.props.history.goBack();
  }

  handleClick(ev) {
    let classList = ev.currentTarget.classList;

    if (classList.contains("vendor-detail-menu-tap")) {
      this.props.updateVendorDetailMenuTapStatus("menu");
    } else if (classList.contains("vendor-detail-info-tap")) {
      this.props.updateVendorDetailMenuTapStatus("info");
    } else if (classList.contains("vendor-detail-review-tap")) {
      this.props.updateVendorDetailMenuTapStatus("review");
    }
  }

  render() {
    if (this.props.initialGeoLocation) {
      var vendor = this.props.vendorDetailInfo;
      var targetLat = this.props.initialGeoLocation.lat;
      var targetLng = this.props.initialGeoLocation.lng;
    }

    return (
      <div className="vendor-detail">
        {!!Object.keys(this.props.vendorDetailInfo).length && (
          <Fragment>
            <div className="vendor-detail-img-wrapper">
              <img src={vendor.img_url} alt="no-img" />
              <button className="direction-finder">찾아가기</button>
            </div>
            <div className="vendor-detail-main-info">
              <div className="vendor-detail-main-info-left">
                <h1 className="vendor-detail-title">{vendor.title}</h1>
                <h6 className="vendor-detail-address">
                  {vendor.address.split(" ")[1]}
                  <span>
                    {getDistanceFromTheTarget(
                      vendor.lat,
                      vendor.lng,
                      targetLat,
                      targetLng
                    )}
                  </span>
                </h6>
                <div className="vendor-detail-working-hour">
                  {`${timeConvertor(vendor.open_time)} -
                  ${timeConvertor(vendor.close_time)}`}
                  {isOpen(vendor.open_time, vendor.close_time) ? (
                    <span className="working-status open">OPEN</span>
                  ) : (
                    <span className="working-status closed">CLOSED</span>
                  )}
                </div>
                <div className="vendor-detail-food-category">
                  {`${vendor.food_categories[0]},
                  ${vendor.food_categories[1]},
                  ${vendor.food_categories[2]}`}
                </div>
              </div>
              <div className="vendor-detail-main-info-right">
                <div className="vendor-detail-rate">{vendor.rate}</div>
                <div className="vendor-detail-favorite-number">
                  {vendor.favorites.length}
                </div>
                <div className="vendor-detail-favorite-toggle-btn">
                  <div>북마크</div>
                </div>
              </div>
            </div>
            <div className="vendor-detail-tap-box">
              <div
                className="vendor-detail-menu-tap"
                onClick={this.handleClick.bind(this)}
              >
                메뉴
              </div>
              <div
                className="vendor-detail-info-tap"
                onClick={this.handleClick.bind(this)}
              >
                정보
              </div>
              <div
                className="vendor-detail-review-tap"
                onClick={this.handleClick.bind(this)}
              >
                <span>리뷰</span>
                <span>({vendor.comments.length})</span>
              </div>
            </div>
            <div className="vendor-detail-body">
              {this.props.vendorDetailTapStatus.menuTap && (
                <ul className="vendor-detail-body-menu">
                  {vendor.menus.map(menu => {
                    if (menu.is_main_menu) {
                      return (
                        <li className="vendor-detail-menu-item" key={menu._id}>
                          <div className="vendor-detail-menu-item-left">
                            <img
                              className="vendor-detail-menu-img"
                              src={menu.img_url}
                              alt="no-menu-img"
                            />
                          </div>
                          <div className="vendor-detail-menu-item-right">
                            <div>{menu.name}</div>
                            <div>{menu.price} 원</div>
                            <div>{menu.description}</div>
                          </div>
                          <div className="speacial-menu">*추천메뉴</div>
                        </li>
                      );
                    }
                  })}
                  {vendor.menus.map(menu => {
                    if (!menu.is_main_menu) {
                      return (
                        <li className="vendor-detail-menu-item" key={menu._id}>
                          <div className="vendor-detail-menu-item-left">
                            <img
                              className="vendor-detail-menu-img"
                              src={menu.img_url}
                              alt="no-menu-img"
                            />
                          </div>
                          <div className="vendor-detail-menu-item-right">
                            <div>{menu.name}</div>
                            <div>{menu.price} 원</div>
                            <div>{menu.description}</div>
                          </div>
                        </li>
                      );
                    }
                  })}
                </ul>
              )}
              {this.props.vendorDetailTapStatus.infoTap && (
                <div className="vendor-detail-body-info">
                  <div className="vendor-detail-body-info-description">
                    {vendor.description}
                  </div>
                  <div className="vendor-detail-body-info-owner">
                    {vendor.owner}
                  </div>
                  <div className="vendor-detail-body-info-permission-no">
                    {vendor.permission_no}
                  </div>
                  <div className="vendor-detail-body-info-tel">
                    {vendor.tel}
                  </div>
                  <div className="vendor-detail-body-info-address">
                    {vendor.address}
                  </div>
                  <SimpleMap
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDLoqJ1W1fexc-GcnUjpxPw41NxZYRKDhk&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `200px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    position={{ lat: vendor.lat, lng: vendor.lng }}
                    icon="https://process.filestackapi.com/AhTgLagciQByzXpFGRI0Az/resize=width:30/https://cdn.iconscout.com/public/images/icon/premium/png-512/food-truck-car-transport-machine-movement-transportation-3486058b4a238844-512x512.png"
                  />
                </div>
              )}
              {this.props.vendorDetailTapStatus.reviewTap && (
                <div className="vendor-detail-body-review">this is review</div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default VendorDetail;

// description
// :
// "떡볶이 1인분, 맵기 조절가능합니다"
// img_url
// :
// "http://pds25.egloos.com/pds/201212/27/12/c0055612_50dc4c85302b9.jpg"
// name
// :
// "떡볶이"
// price
// :
// "3000"
// _id
// :
// "5b597656708af066702f5d34"

// {
//   "title": "이쁜할머니네",
//   "description": "강남에서 분식을 파는 이쁜 할머니네입니다.",
//   "img_url": "http://prettygrandma.com/img.png",
//   "permission_no": "3000000-104-2017-00063",
//   "address": "",
//   "location_x": 37.4982168,
//   "location_y": 127.0246351,
//   "tel": "",
//   "owner": "김복순",
//   "join_date": "2018-08-01",
//   "open_time": "09:30",
//   "close_date": "22:00",
//   "food_label": [
//     "분식",
//     "떡볶이",
//     "순대"
//   ],
//   "favorites": [
//     "fb_Id"
//   ],
//   "menus": [
//     {
//       "menu_name": "떡볶이",
//       "menu_price": "3,000원",
//       "menu_description": "달달한 쌀떡볶이 입니다.",
//       "menu_img_url": "http://img.com/img.png",
//       "is_main_menu": true
//     }
//   ],
//   "comments": [
//     {
//       "comment_id": "_id",
//       "comment_rate": 10,
//       "comment_author": "불개미",
//       "comment_body": "맛있어요, 양도 많구요, 튀김과의 조화가 환상적임",
//       "comment_created_at": "2018-08-02 20:34",
//       "comment_img_url": "http://comment.com/img.png"
//     }
//   ]
// }
