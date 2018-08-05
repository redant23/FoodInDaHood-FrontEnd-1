import * as types from "../constants";
import * as actions from "./index";

describe("actions", () => {
  it("updateInitialGeoLocationAction", () => {
    expect(
      actions.updateInitialGeoLocationAction({ lat: 38, lng: 147 })
    ).toEqual({
      type: types.INITIAL_GEOLOCATION,
      initialGeoLocation: { lat: 38, lng: 147 }
    });
  });

  it("setFooterNavTapStatusToMainAction", () => {
    expect(actions.setFooterNavTapStatusToMainAction()).toEqual({
      type: types.SET_MAIN_TAP
    });
  });
});
