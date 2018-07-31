import React, { Component, Fragment } from "react";
import VendorList from "../VendorList/VendorList";
import FacebookLogin from "react-facebook-login";
import "./MyListPage.css";

class MyListPage extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props._getCustomerFavoriteListRequest(
        this.props.authorizedUserData.userInfo._id
      );
    }

    this.props.updateFooterNavTapStatus("my-list");
  }

  responseFacebook(response) {
    this.props._userSignInSignUpRequest(response.accessToken);
  }

  handleClick(vendorId) {
    this.props.updateVendorDetailId(vendorId);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.isAuthenticated && nextProps.myFavoriteList.length === 0) {
      let userId = nextProps.authorizedUserData.userInfo._id;
      nextProps._getCustomerFavoriteListRequest(userId);
    }

    return true;
  }

  render() {
    return (
      <div className="my-list-page">
        {this.props.isAuthenticated ? (
          <Fragment>
            <div className="my-list-info">
              <div className="my-list-img-wrapper">
                <img
                  className="my-list-img"
                  src={this.props.authorizedUserData.userInfo.picture}
                  alt="no-img"
                />
              </div>
              <div className="my-list-info-detail">
                <div className="my-list-name">
                  {this.props.authorizedUserData.userInfo.username}
                </div>
                <div className="my-list-email">
                  {this.props.authorizedUserData.userInfo.email}
                </div>
                <ul>
                  {this.props.authorizedUserData.userInfo.comments.map(
                    comment => (
                      <li key={comment._id}>
                        <div>{comment.vendor_id}</div>
                        <div>{comment.img_url}</div>
                        <div>{comment.rate}</div>
                        <div>{comment.body}</div>
                        <div>{comment.created_at}</div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <div className="my-list-favorite-trucks">
              {this.props.myFavoriteList && (
                <Fragment>
                  <div>
                    나의 즐겨찾는 트럭 수 :
                    {this.props.myFavoriteList.length}
                  </div>
                  <VendorList
                    vendorList={this.props.myFavoriteList}
                    initialGeoLocation={this.props.initialGeoLocation}
                    handleClick={this.handleClick.bind(this)}
                  />
                </Fragment>
              )}
            </div>
          </Fragment>
        ) : (
          <FacebookLogin
            appId="2171887249551647"
            autoLoad={false}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default MyListPage;
