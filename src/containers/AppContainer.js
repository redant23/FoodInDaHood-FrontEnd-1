import { connect } from "react-redux";
import axios from "axios";
import App from "../components/App/App";

import {
  updateInitialGeoLocationAction,
  updateVendorListAction,
  setFooterNavTapStatusToMainAction,
  setFooterNavTapStatusToSearchAction,
  setFooterNavTapStatusToMyListAction,
  setFooterNavTapStatusToExtraAction,
  setVenderListFilterStatusToDistanceAction,
  setVenderListFilterStatusToFavoriteAction,
  setVenderListFilterStatusToCommentAction,
  updateVendorListPageStatusAction,
  updateVendorListDistanceAction,
  resetVendorListPageStatusAction,
  resetVendorListAction,
  stopVendorListInfinityScrollStatusAction,
  resumeVendorListInfinityScrollAction,
  activateScrollLoadingAction,
  deactivateScrollLoadingAction,
  updateSearchedVendorListAction,
  resetSearchedVendorListAction,
  updateVendorListTotalNumberAction,
  updateVendorDetailInfoAction,
  updateVendorDetailIdAction,
  setVendorDetailMenuTapStatusToMenuAction,
  setVendorDetailMenuTapStatusToInfoAction,
  setVendorDetailMenuTapStatusToReviewAction,
  updateAthorizedUserInfoAction,
  updateVendorCommentListAction,
  updateMyFavoriteListAction,
  addFavoriteInVendorDetailInfoAction,
  removeFavoriteInVendorDetailInfoAction,
  updateSearchKeywordAction
} from "./../actions";

const mapStateToProps = ({
  initialGeoLocation,
  vendorList,
  footerNavTapStatus,
  vendorListFilterStatus,
  vendorListPageNumberStatus,
  vendorListDistance,
  vendorListInfinityScrollStatus,
  isScrollLoadingActive,
  searchedVendorList,
  vendorListTotalNumber,
  vendorDetailInfo,
  vendorDetailId,
  vendorDetailTapStatus,
  authorizedUserData,
  vendorCommentList,
  myFavoriteList,
  searchKeyWord
}) => {
  return {
    initialGeoLocation,
    vendorList,
    footerNavTapStatus,
    vendorListFilterStatus,
    vendorListPageNumberStatus,
    vendorListDistance,
    vendorListInfinityScrollStatus,
    isScrollLoadingActive,
    searchedVendorList,
    vendorListTotalNumber,
    vendorDetailInfo,
    vendorDetailId,
    vendorDetailTapStatus,
    authorizedUserData,
    vendorCommentList,
    myFavoriteList,
    searchKeyWord,
    isAuthenticated: authorizedUserData.isAuthenticated
  };
};

let isInProgress = false;

const mapDispatchToProps = dispatch => ({
  updateInitialGeoLocation: initialGeoLocation => {
    dispatch(updateInitialGeoLocationAction(initialGeoLocation));
  },
  getVendorList_API_Request: (geolocation, distance, startIdx, endIdx) => {
    var lat = geolocation.lat;
    var lng = geolocation.lng;

    console.log(startIdx);
    console.log(endIdx);
    dispatch(activateScrollLoadingAction());

    if (isInProgress) {
      return;
    }

    isInProgress = true;

    axios({
      method: "get",
      url: `http://192.168.1.88:5000/api/vendor/vendorList?lat=${lat}&lng=${lng}&distance=${distance}&startIdx=${startIdx}&endIdx=${endIdx}`
    }).then(res => {
      isInProgress = false;

      if (!!res.data.vendorList.length) {
        dispatch(updateVendorListAction(res.data.vendorList));
        dispatch(updateVendorListTotalNumberAction(res.data.total));
        dispatch(updateVendorListPageStatusAction());
      } else {
        dispatch(stopVendorListInfinityScrollStatusAction());
      }
      dispatch(deactivateScrollLoadingAction());
    });

    // setTimeout(() => {
    //   dispatch(updateVendorListAction(sampleData));
    //   dispatch(updateVendorListTotalNumberAction(200));
    // }, 2000);
  },
  updateFooterNavTapStatus: tapType => {
    if (tapType === "main-tap") {
      dispatch(setFooterNavTapStatusToMainAction());
      dispatch(resetSearchedVendorListAction());
    } else if (tapType === "search-tap") {
      dispatch(setFooterNavTapStatusToSearchAction());
    } else if (tapType === "my-list") {
      dispatch(setFooterNavTapStatusToMyListAction());
      dispatch(resetSearchedVendorListAction());
    } else if (tapType === "extra") {
      dispatch(setFooterNavTapStatusToExtraAction());
      dispatch(resetSearchedVendorListAction());
    }
  },
  updateVendorListDistance: distance => {
    dispatch(updateVendorListDistanceAction(distance));
  },
  updateVendorListFilterStatus: filterType => {
    if (filterType === "distance") {
      dispatch(setVenderListFilterStatusToDistanceAction());
    } else if (filterType === "favorite") {
      dispatch(setVenderListFilterStatusToFavoriteAction());
    }
    if (filterType === "comment") {
      dispatch(setVenderListFilterStatusToCommentAction());
    }
  },
  updateVendorListPageStatus: () => {
    dispatch(updateVendorListPageStatusAction());
  },
  resetVendorListPageStatus: () => {
    dispatch(resetVendorListPageStatusAction());
  },
  resetVendorList: () => {
    dispatch(resetVendorListAction());
  },
  resumeVendorListInfinityScroll: () => {
    dispatch(resumeVendorListInfinityScrollAction());
  },
  _getVendorListSearchRequest: keyWord => {
    dispatch(activateScrollLoadingAction());
    let encodedKeyWord = encodeURI(keyWord);

    axios({
      method: "get",
      url: `http://192.168.1.88:5000/api/vendor/vendor-search?keyword=${encodedKeyWord}`
    }).then(res => {
      dispatch(updateSearchedVendorListAction(res.data));
      dispatch(deactivateScrollLoadingAction());
    });
  },
  updateVendorDetailId: vendorId => {
    dispatch(updateVendorDetailIdAction(vendorId));
  },
  _getVendorDetailInfoRequest: vendorId => {
    dispatch(activateScrollLoadingAction());
    axios({
      method: "get",
      url: `http://192.168.1.88:5000/api/vendor/vendor-detail?vendorId=${vendorId}`
    }).then(res => {
      dispatch(updateVendorDetailInfoAction(res.data));
      dispatch(deactivateScrollLoadingAction());
    });
  },
  updateVendorDetailMenuTapStatus: tapType => {
    if (tapType === "menu") {
      dispatch(setVendorDetailMenuTapStatusToMenuAction());
    } else if (tapType === "info") {
      dispatch(setVendorDetailMenuTapStatusToInfoAction());
    } else if (tapType === "review") {
      dispatch(setVendorDetailMenuTapStatusToReviewAction());
    }
  },
  _userSignInSignUpRequest: accessToken => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: accessToken }, null, 2)],
      { type: "application/json" }
    );

    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default"
    };

    fetch("http://192.168.1.88:5000/api/auth/facebook", options).then(r => {
      if (r.status !== 500) {
        r.json().then(data => {
          localStorage.setItem("x-auth-token", data.token);
          localStorage.setItem("x-auth-facebook-token", accessToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.token}`;
          axios.defaults.headers.post["Content-Type"] =
            "application/x-www-form-urlencoded";
          if (data.token) {
            dispatch(
              updateAthorizedUserInfoAction({
                userInfo: data.user,
                userToken: data.token
              })
            );
          }
        });
      }
    });
  },
  _updateUserCommentRequest: (vendorId, userInfo, commentInfo) => {
    let userId = userInfo._id;
    let userName = userInfo.username;
    let userImg = userInfo.picture;

    let formData = new FormData();

    formData.append("vendor_id", vendorId);
    formData.append("customer_id", userId);
    formData.append("customer_name", userName);
    formData.append("customer_imgUrl", userImg);
    formData.append("comment_rate", commentInfo.rate);
    formData.append("comment_content", commentInfo.value);
    formData.append("comment_img", commentInfo.image);
    formData.append("created_at", new Date());

    return fetch("http://192.168.1.88:5000/api/comment/new", {
      method: "POST",
      body: formData
    });
  },
  _getVendorCommentListRequest: vendorId => {
    axios({
      method: "get",
      url: `http://192.168.1.88:5000/api/comment/list?vendorId=${vendorId}`
    }).then(res => {
      dispatch(updateVendorCommentListAction(res.data));
    });

    axios({
      method: "get",
      url: `http://192.168.1.88:5000/api/vendor/vendor-detail?vendorId=${vendorId}`
    }).then(res => {
      dispatch(updateVendorDetailInfoAction(res.data));
      dispatch(deactivateScrollLoadingAction());
    });
  },
  _addFavoriteRequest: (vendorId, customerId) => {
    console.log(vendorId, customerId, "add");
    dispatch(activateScrollLoadingAction());
    let data = {
      vendorId,
      customerId
    };
    axios({
      method: "POST",
      url: `http://192.168.1.88:5000/api/favorite/add`,
      data
    }).then(() => {
      dispatch(addFavoriteInVendorDetailInfoAction(customerId));
      dispatch(deactivateScrollLoadingAction());
    });
  },
  _removeFavoriteRequest: (vendorId, customerId) => {
    dispatch(activateScrollLoadingAction());
    console.log(vendorId, customerId, "remove");
    let data = {
      vendorId,
      customerId
    };

    axios({
      method: "POST",
      url: `http://192.168.1.88:5000/api/favorite/remove`,
      data
    }).then(() => {
      dispatch(removeFavoriteInVendorDetailInfoAction(customerId));
      dispatch(deactivateScrollLoadingAction());
    });
  },
  _getCustomerFavoriteListRequest: customerId => {
    console.log(customerId);
    dispatch(activateScrollLoadingAction());
    axios({
      method: "GET",
      url: `http://192.168.1.88:5000/api/customer/myfavoritetrucks?customerId=${customerId}`
    }).then(res => {
      dispatch(updateMyFavoriteListAction(res.data));
      dispatch(deactivateScrollLoadingAction());
    });
  },
  updateSearchKeyWord: foodName => {
    dispatch(updateSearchKeywordAction(foodName));
  },
  _vendorRegistrationRequest: vendorInfo => {
    console.log(vendorInfo);
    let formData = new FormData();
    formData.append("title", vendorInfo.title);
    formData.append("description", vendorInfo.description);
    formData.append("permissionNumber", vendorInfo.permissionNumber);
    formData.append("address", vendorInfo.address);
    formData.append("lat", vendorInfo.lat);
    formData.append("lng", vendorInfo.lng);
    formData.append("tel", vendorInfo.tel);
    formData.append("owner", vendorInfo.owner);
    formData.append("joinDate", new Date());
    formData.append("openTime", vendorInfo.openTime);
    formData.append("closeTime", vendorInfo.closeTime);
    formData.append("image", vendorInfo.image);
    formData.append("menu", JSON.stringify(vendorInfo.menu));
    formData.append(
      "foodCategory",
      JSON.stringify(vendorInfo.menuCategoryData)
    );

    console.log(formData);
    debugger;
    vendorInfo.menu.forEach((item, index) => {
      formData.append(`menuPhoto`, vendorInfo.menu[index].img_url);
    });

    fetch("http://192.168.1.88:5000/api/vendor/signup/add", {
      method: "POST",
      body: formData,
      data: JSON.stringify(vendorInfo)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        debugger;
      });

    // axios.post("http://192.168.1.88:5000/api/vendor/signup/add", {
    //   headers: {
    //     "Content-Type": "multipart/form-data"
    //   },
    //   data: formData
    // });
  }
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
