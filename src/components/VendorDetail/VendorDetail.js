import React, { Component, Fragment } from "react";
import Rate from "rc-rate";
import FacebookLogin from "react-facebook-login";
import { Link } from "react-router-dom";
import { createdAt } from "../../helpers/timeHelpers";
import { timeConvertor, isOpen } from "../../helpers/timeHelpers";
import { getDistanceFromTheTarget } from "../../helpers/filterHelpers";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import "./VendorDetail.css";
import "./rc-rate.css";

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
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      rate: 3,
      image: null,
      isChecked: false
    };
  }

  componentDidMount() {
    this.props._getVendorDetailInfoRequest(this.props.vendorDetailId);
    this.props._getVendorCommentListRequest(this.props.vendorDetailId);
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

  handleFavoriteClick(ev) {
    let vendorId = this.props.vendorDetailId;
    let customerId = this.props.authorizedUserData.userInfo._id;

    if (ev.target.checked) {
      this.props._addFavoriteRequest(vendorId, customerId);
    } else {
      this.props._removeFavoriteRequest(vendorId, customerId);
    }
  }

  handleChange(ev) {
    this.setState({ value: ev.target.value });
  }

  handleImageChange(ev) {
    let image = ev.target.files[0];
    this.setState({ image });
  }

  handleStarChange(star) {
    this.setState({ rate: star });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props
      ._updateUserCommentRequest(
        this.props.vendorDetailId,
        this.props.authorizedUserData.userInfo,
        this.state
      )
      .then(res => res.json())
      .then(res => {
        console.log(res.msg);
        this.setState({
          value: "",
          rate: 3,
          image: null
        });
        this.props._getVendorCommentListRequest(this.props.vendorDetailId);
      });
  }

  handleSearchKeywordClick(foodname) {
    this.props.updateSearchKeyWord(foodname);
  }

  responseFacebook(response) {
    this.props._userSignInSignUpRequest(response.accessToken);
  }

  render() {
    if (this.props.initialGeoLocation) {
      var vendor = this.props.vendorDetailInfo;
      var targetLat = this.props.initialGeoLocation.lat;
      var targetLng = this.props.initialGeoLocation.lng;
    }

    var isFavorite = false;
    if (
      this.props.isAuthenticated &&
      !!Object.keys(this.props.vendorDetailInfo).length
    ) {
      isFavorite = !!this.props.vendorDetailInfo.favorites.find(
        customerId =>
          customerId._id === this.props.authorizedUserData.userInfo._id
      );
    }

    var rateAvg = 0;
    var rateAvgStar = 0;

    if (this.props.vendorCommentList.length && !rateAvg) {
      var sum = 0;
      this.props.vendorCommentList.forEach(item => {
        sum += item.rate;
      });
      rateAvg = Math.round(sum / this.props.vendorCommentList.length * 10) / 10;
      if (Number(rateAvg.toString().indexOf(".") === -1)) {
        rateAvgStar = rateAvg;
      } else if (Number(rateAvg.toString().split(".")[1]) <= 2) {
        rateAvgStar = parseInt(rateAvg, 10);
      } else if (Number(rateAvg.toString().split(".")[1]) <= 7) {
        rateAvgStar = parseInt(rateAvg, 10) + 0.5;
      } else if (Number(rateAvg.toString().split(".")[1]) <= 9) {
        rateAvgStar = parseInt(rateAvg, 10) + 1;
      }
    }

    return (
      <div className="vendor-detail">
        {!!Object.keys(this.props.vendorDetailInfo).length && (
          <Fragment>
            <div className="vendor-detail-img-wrapper">
              <img src={vendor.img_url} alt="no-img" />
              <a
                href={`https://www.google.com/maps?saddr=${targetLat},${targetLng}&daddr=${vendor.lat},${vendor.lng}`}
                className="direction-finder"
                target="_blank"
              >
                찾아가기
              </a>
            </div>
            <div className="vendor-detail-main-info">
              <div className="vendor-detail-main-info-left">
                <h1 className="vendor-detail-title">{vendor.title}</h1>
                <h6 className="vendor-detail-address">
                  {vendor.address.split(" ")[1]} &middot;{" "}
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
                    <span className="working-status open">영업중</span>
                  ) : (
                    <span className="working-status closed">영업종료</span>
                  )}
                </div>
                <div className="vendor-detail-food-category">
                  {vendor.food_categories_info.map(categoryInfo => (
                    <Link
                      to="/search"
                      onClick={this.handleSearchKeywordClick.bind(
                        this,
                        categoryInfo.foodname
                      )}
                      key={categoryInfo._id}
                    >
                      <span className="food-catetory-info">
                        {categoryInfo.foodname}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="vendor-detail-main-info-right">
                <div className="vendor-detail-rate">
                  <span className="vendor-detail-rate-text">{rateAvg} 점</span>
                  <Rate
                    className="comment-form-rate rc-rate-disabled"
                    value={rateAvgStar}
                    character={<i className="anticon anticon-star" />}
                    allowHalf={true}
                    disabled={true}
                  />
                </div>
                <div className="vendor-detail-favorite-number">
                  즐겨찾기 : {vendor.favorites.length}
                </div>
                <div className="vendor-detail-favorite-toggle-btn-wrap">
                  {this.props.isAuthenticated ? (
                    <div className="vendor-detail-favorite-toggle-btn">
                      {isFavorite ? (
                        <span className="favorite-tint-selected">즐겨찾기 해제</span>
                      ) : (
                        <span className="favorite-tint">즐겨찾기 추가</span>
                      )}
                      <input
                        type="checkbox"
                        id="myCheck"
                        onChange={this.handleFavoriteClick.bind(this)}
                        checked={isFavorite}
                      />
                    </div>
                  ) : null}
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
                  {vendor.menus.map((menu, index) => {
                    if (menu.is_main_menu) {
                      return (
                        <li className="vendor-detail-menu-item" key={index}>
                          <div className="vendor-detail-menu-item-left">
                            <img
                              className="vendor-detail-menu-img"
                              src={menu.img_url}
                              alt="no-menu-img"
                            />
                          </div>
                          <div className="vendor-detail-menu-item-right">
                            <div>
                              메뉴명:{" "}
                              <span className="justyfied-area">
                                {menu.name}
                              </span>
                            </div>
                            <div>
                              가격:{" "}
                              <span className="justyfied-area">
                                {menu.price} 원
                              </span>
                            </div>
                            <div>
                              설명:{" "}
                              <span className="justyfied-area">
                                {menu.description}
                              </span>
                            </div>
                          </div>
                          <div className="speacial-menu">사장님이 추천하는 메뉴!</div>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                  {vendor.menus.map((menu, index) => {
                    if (!menu.is_main_menu) {
                      return (
                        <li className="vendor-detail-menu-item" key={index}>
                          <div className="vendor-detail-menu-item-left">
                            <img
                              className="vendor-detail-menu-img"
                              src={menu.img_url}
                              alt="no-menu-img"
                            />
                          </div>
                          <div className="vendor-detail-menu-item-right">
                            <div>
                              메뉴명:{" "}
                              <span className="justyfied-area">
                                {menu.name}
                              </span>
                            </div>
                            <div>
                              가격:{" "}
                              <span className="justyfied-area">
                                {menu.price} 원
                              </span>
                            </div>
                            <div>
                              설명:{" "}
                              <span className="justyfied-area">
                                {menu.description}
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                </ul>
              )}
              {this.props.vendorDetailTapStatus.infoTap && (
                <div className="vendor-detail-body-info">
                  푸드트럭 소개
                  <div className="vendor-detail-body-info-description">
                    {vendor.description}
                  </div>
                  푸드트럭 사업자 성명
                  <div className="vendor-detail-body-info-owner">
                    {vendor.owner}
                  </div>
                  영업 허가번호
                  <div className="vendor-detail-body-info-permission-no">
                    {vendor.permission_no}
                  </div>
                  푸드트럭 전화번호
                  <div className="vendor-detail-body-info-tel">
                    {vendor.tel}
                  </div>
                  푸드트럭 주소
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
                <div className="vendor-detail-body-review">
                  {this.props.isAuthenticated ? (
                    <form
                      className="comment-form"
                      onSubmit={this.handleSubmit.bind(this)}
                    >
                      <div className="comment-form-title">
                        <span>
                          {this.props.authorizedUserData.userInfo.username}
                        </span>
                        <span>님, 여기 푸드트럭은 어땠나요?</span>
                      </div>
                      <Rate
                        className="comment-form-rate"
                        defaultValue={3}
                        onChange={this.handleStarChange.bind(this)}
                        character={<i className="anticon anticon-star" />}
                        allowHalf={true}
                      />
                      <textarea
                        className="comment-form-content"
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                        type="text"
                        placeholder="후기를 남겨주세요 :)"
                      />
                      <input
                        className="comment-form-img-upload"
                        type="file"
                        name="pic"
                        accept="image/*"
                        onChange={this.handleImageChange.bind(this)}
                      />
                      <input
                        className="comment-form-btn"
                        type="submit"
                        value="댓글달기"
                      />
                    </form>
                  ) : (
                    <div className="review-login-btn">
                      <span className="fb-login-text">로그인 후 댓글을 남겨주세요!</span>
                      <FacebookLogin
                        appId="2171887249551647"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook.bind(this)}
                      />
                    </div>
                  )}
                  <ul className="comment-list">
                    {this.props.vendorCommentList
                      .sort((a, b) => {
                        return new Date(b.created_at) - new Date(a.created_at);
                      })
                      .map(comment => (
                        <li key={comment._id} className="comment-item">
                          <div className="comment-info">
                            <div className="user-img-wrapper">
                              <img
                                className="user-img"
                                src={comment.customer_imgUrl}
                                alt="no-img"
                              />
                            </div>
                            <div className="comment-info-detail">
                              <h1 className="comment-user-name">
                                {comment.customer_name}
                              </h1>
                              <Rate
                                className="comment-rate"
                                character={
                                  <i className="anticon anticon-star" />
                                }
                                value={comment.rate}
                                allowHalf={true}
                                disabled={true}
                              />
                              <div className="comment-date">
                                {createdAt(comment.created_at)}
                              </div>
                            </div>
                          </div>
                          <p className="comment-content">{comment.body}</p>
                          <div className="comment-img">
                            <img src={comment.img_url} alt="no-img" />
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default VendorDetail;
