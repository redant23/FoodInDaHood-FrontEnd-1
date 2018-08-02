import footerNavTapStatusReducer from "./footerNavTapStatus";
import {
  SET_MAIN_TAP,
  SET_SEARCH_TAP,
  SET_MY_LIST_TAP,
  SET_EXTRA_TAP
} from "../constants";

describe("footerNavTapStatus Reducer", () => {
  it("had a default state", () => {
    expect(
      footerNavTapStatusReducer(undefined, {
        type: "unexpected"
      })
    ).toEqual({
      mainTap: true,
      searchTap: false,
      myListTap: false,
      extraTap: false
    });
  });

  it("can handle SET_MAIN_TAP", () => {
    expect(
      footerNavTapStatusReducer(
        {
          mainTap: true,
          searchTap: false,
          myListTap: false,
          extraTap: false
        },
        {
          type: SET_MAIN_TAP
        }
      )
    ).toEqual({
      mainTap: true,
      searchTap: false,
      myListTap: false,
      extraTap: false
    });
  });

  it("can handle SET_SEARCH_TAP", () => {
    expect(
      footerNavTapStatusReducer(
        {
          mainTap: true,
          searchTap: false,
          myListTap: false,
          extraTap: false
        },
        {
          type: SET_SEARCH_TAP
        }
      )
    ).toEqual({
      mainTap: false,
      searchTap: true,
      myListTap: false,
      extraTap: false
    });
  });

  it("can handle SET_MY_LIST_TAP", () => {
    expect(
      footerNavTapStatusReducer(
        {
          mainTap: true,
          searchTap: false,
          myListTap: false,
          extraTap: false
        },
        {
          type: SET_MY_LIST_TAP
        }
      )
    ).toEqual({
      mainTap: false,
      searchTap: false,
      myListTap: true,
      extraTap: false
    });
  });

  it("can handle SET_EXTRA_TAP", () => {
    expect(
      footerNavTapStatusReducer(
        {
          mainTap: true,
          searchTap: false,
          myListTap: false,
          extraTap: false
        },
        {
          type: SET_EXTRA_TAP
        }
      )
    ).toEqual({
      mainTap: false,
      searchTap: false,
      myListTap: false,
      extraTap: true
    });
  });
});
