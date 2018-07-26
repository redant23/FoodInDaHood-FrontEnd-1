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
  deactivateScrollLoadingAction
} from "./../actions";

let sampleData = [
  {
    _id: {
      $oid: "5b571a30885f9e2a746812c4"
    },
    favorites: ["dummy", "dummy", "dummy", "dummy", "dummy"],
    title: "냠냠쩝쩝",
    permission_no: "3180000-104-2016-00289",
    address: "강원도 평창군 대관령면 사부랑길 62-2 (대관령눈꽃축제장)",
    lat: 37.5032,
    lng: 127.0221,
    tel: "010-5555-6666",
    description: "냠냠쩝쩝입니다.",
    img_url:
      "https://blog.hmgjournal.com/upload/common/activeSquare/binary/201507021509230_KMPGOPJR.jpg",
    join_date: {
      $date: "2018-07-31T19:00:00.000Z"
    },
    open_time: {
      $date: "2000-01-01T03:30:00.000Z"
    },
    close_time: {
      $date: "2000-01-01T13:00:00.000Z"
    },
    owner: "냠냠쩝",
    menus: [],
    comments: [
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy"
    ],
    food_categories: ["초밥, 연어, 참치"],
    __v: 0
  },
  {
    _id: {
      $oid: "5b571a30885f9e2a746812c5"
    },
    favorites: ["dummy", "dummy", "dummy", "dummy", "dummy"],
    title: "닥가게(80로4845)",
    permission_no: "3130000-104-2016-00325",
    address: "서울특별시 마포구 월드컵로 243-48 (성산동 평화의공원내)",
    lat: 37.497576,
    lng: 127.0267734,
    tel: "010-5555-6666",
    description: "닥가게(80로4845)입니다.",
    img_url:
      "https://blog.hmgjournal.com/upload/common/activeSquare/binary/201507021509230_KMPGOPJR.jpg",
    join_date: {
      $date: "2018-07-31T15:00:00.000Z"
    },
    open_time: {
      $date: "2000-01-01T00:30:00.000Z"
    },
    close_time: {
      $date: "2000-01-01T13:00:00.000Z"
    },
    owner: "닥가게",
    menus: [],
    comments: ["dummy", "dummy", "dummy", "dummy", "dummy"],
    food_categories: ["초밥, 연어, 참치"],
    __v: 0
  },
  {
    _id: {
      $oid: "5b571a30885f9e2a746812c6"
    },
    favorites: [
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy"
    ],
    title: "슈퍼스트라이크",
    permission_no: "3180000-104-2016-00322",
    address: "서울특별시 영등포구 여의동로 343 (여의도동 (98러2576))",
    lat: 37.52708506111111,
    lng: 126.9328642388889,
    tel: "010-5555-6666",
    description: "슈퍼스트라이크입니다.",
    img_url:
      "https://blog.hmgjournal.com/upload/common/activeSquare/binary/201507021509230_KMPGOPJR.jpg",
    join_date: {
      $date: "2018-07-31T15:00:00.000Z"
    },
    open_time: {
      $date: "2000-01-01T00:30:00.000Z"
    },
    close_time: {
      $date: "2000-01-01T13:00:00.000Z"
    },
    owner: "슈퍼스",
    menus: [],
    comments: ["dummy", "dummy", "dummy", "dummy", "dummy", "dummy"],
    food_categories: ["초밥, 연어, 참치"],
    __v: 0
  },
  {
    _id: {
      $oid: "5b571a30885f9e2a746812c7"
    },
    favorites: ["dummy", "dummy", "dummy", "dummy", "dummy"],
    title: "국가대표 트럭",
    permission_no: "3030000-104-2016-00135",
    address: "서울특별시 성동구 왕십리로 222 1층 (사근동 한양대학교 생활과학대학교앞(92주6464))",
    lat: 37.560426288888884,
    lng: 127.04991699444444,
    tel: "010-5555-6666",
    description: "국가대표 트럭입니다.",
    img_url:
      "https://blog.hmgjournal.com/upload/common/activeSquare/binary/201507021509230_KMPGOPJR.jpg",
    join_date: {
      $date: "2018-07-31T15:00:00.000Z"
    },
    open_time: {
      $date: "2000-01-01T00:30:00.000Z"
    },
    close_time: {
      $date: "2000-01-01T13:00:00.000Z"
    },
    owner: "국가대",
    menus: [],
    comments: ["dummy", "dummy", "dummy", "dummy", "dummy", "dummy", "dummy"],
    food_categories: ["초밥, 연어, 참치"],
    __v: 0
  },
  {
    _id: {
      $oid: "5b571a30885f9e2a746812c9"
    },
    favorites: [0, 1, 2, 3, 4, 5, 6, 7],
    title: "냠냠떡볶이",
    permission_no: "3210000-104-2017-00130",
    address: "서울특별시 서초구 양재동 316-10번지 양재시민의숲 3번출구 앞 ",
    lat: 37.466910338888894,
    lng: 127.03878573333333,
    tel: "010-5555-6666",
    description: "냠냠떡볶이입니다.",
    img_url:
      "https://blog.hmgjournal.com/upload/common/activeSquare/binary/201507021509230_KMPGOPJR.jpg",
    join_date: {
      $date: "2018-07-31T15:00:00.000Z"
    },
    open_time: {
      $date: "2000-01-01T00:30:00.000Z"
    },
    close_time: {
      $date: "2000-01-01T13:00:00.000Z"
    },
    owner: "냠냠떡",
    menus: [],
    comments: [
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy"
    ],
    food_categories: ["초밥, 연어, 참치"],
    __v: 0
  },
  {
    _id: {
      $oid: "5b571a30885f9e2a746812c8"
    },
    favorites: [0, 1, 2, 3, 4, 5],
    title: "착햄",
    permission_no: "3180000-104-2017-00101",
    address: "서울특별시 영등포구 여의도동 86-7번지 여의도한강공원민속놀이마당(83모7926) ",
    lat: 37.51844248611111,
    lng: 126.94111170277777,
    tel: "010-5555-6666",
    description: "착햄입니다.",
    img_url:
      "https://blog.hmgjournal.com/upload/common/activeSquare/binary/201507021509230_KMPGOPJR.jpg",
    join_date: {
      $date: "2018-07-31T15:00:00.000Z"
    },
    open_time: {
      $date: "2000-01-01T00:30:00.000Z"
    },
    close_time: {
      $date: "2000-01-01T13:00:00.000Z"
    },
    owner: "착햄",
    menus: [],
    comments: ["dummy", "dummy"],
    food_categories: ["초밥, 연어, 참치"],
    __v: 0
  },
  {
    _id: {
      $oid: "5b571a30885f9e2a746812ca"
    },
    favorites: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    title: "팬더그릴(Pan the grill)",
    permission_no: "3180000-104-2017-00059",
    address: "서울특별시 영등포구 여의동로 330 (여의도동 물빛광장(89모1083))",
    lat: 37.52634778888889,
    lng: 126.93359546111111,
    tel: "010-5555-6666",
    description: "팬더그릴(Pan the grill)입니다.",
    img_url:
      "https://blog.hmgjournal.com/upload/common/activeSquare/binary/201507021509230_KMPGOPJR.jpg",
    join_date: {
      $date: "2018-07-31T15:00:00.000Z"
    },
    open_time: {
      $date: "2000-01-01T00:30:00.000Z"
    },
    close_time: {
      $date: "2000-01-01T13:00:00.000Z"
    },
    owner: "팬더그",
    menus: [],
    comments: ["dummy"],
    food_categories: ["초밥, 연어, 참치"],
    __v: 0
  },
  {
    _id: {
      $oid: "5b571a30885f9e2a746812cd"
    },
    favorites: [0, 1, 2, 3, 4],
    title: "톡투미다밥협동조합",
    permission_no: "3180000-104-2017-00063",
    address: "서울특별시 영등포구 여의동로 330 (여의도동 물빛광장94보4365)",
    lat: 37.52634778888889,
    lng: 126.93359546111111,
    tel: "070-7784-7579",
    description: "톡투미다밥협동조합입니다.",
    img_url:
      "https://blog.hmgjournal.com/upload/common/activeSquare/binary/201507021509230_KMPGOPJR.jpg",
    join_date: {
      $date: "2018-07-31T15:00:00.000Z"
    },
    open_time: {
      $date: "2000-01-01T00:30:00.000Z"
    },
    close_time: {
      $date: "2000-01-01T13:00:00.000Z"
    },
    owner: "톡투미",
    menus: [],
    comments: [
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy",
      "dummy"
    ],
    food_categories: ["초밥, 연어, 참치"],
    __v: 0
  }
];

const mapStateToProps = ({
  initialGeoLocation,
  vendorList,
  footerNavTapStatus,
  vendorListFilterStatus,
  vendorListPageNumberStatus,
  vendorListDistance,
  vendorListInfinityScrollStatus,
  isScrollLoadingActive
}) => {
  return {
    initialGeoLocation,
    vendorList,
    footerNavTapStatus,
    vendorListFilterStatus,
    vendorListPageNumberStatus,
    vendorListDistance,
    vendorListInfinityScrollStatus,
    isScrollLoadingActive
  };
};

let isInProgress = false;

const mapDispatchToProps = dispatch => ({
  updateInitialGeoLocation: initialGeoLocation => {
    dispatch(updateInitialGeoLocationAction(initialGeoLocation));
  },
  getVendorList_API_Request: (geolocation, distance, startIdx, endIdx) => {
    // var lat = geolocation.lat;
    // var lng = geolocation.lng;

    // dispatch(activateScrollLoadingAction());

    // if (isInProgress) {
    //   return;
    // }

    // isInProgress = true;

    // axios({
    //   method: "get",
    //   url: `http://192.168.0.42:5000/api/vendor/vendorList?lat=${lat}&lng=${lng}&distance=${distance}&startIdx=${startIdx}&endIdx=${endIdx}`
    // }).then(res => {
    //   isInProgress = false;

    //   if (!!res.data.length) {
    //     dispatch(updateVendorListAction(res.data));
    //     dispatch(updateVendorListPageStatusAction());
    //   } else {
    //     dispatch(stopVendorListInfinityScrollStatusAction());
    //   }
    //   dispatch(deactivateScrollLoadingAction());
    // });

    setTimeout(() => {
      dispatch(updateVendorListAction(sampleData));
    }, 2000);
  },
  updateFooterNavTapStatus: tapType => {
    if (tapType === "main-tap") {
      dispatch(setFooterNavTapStatusToMainAction());
    } else if (tapType === "search-tap") {
      dispatch(setFooterNavTapStatusToSearchAction());
    } else if (tapType === "my-list") {
      dispatch(setFooterNavTapStatusToMyListAction());
    } else if (tapType === "extra") {
      dispatch(setFooterNavTapStatusToExtraAction());
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
  }
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
