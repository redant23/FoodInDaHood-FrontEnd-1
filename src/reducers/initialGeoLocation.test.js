import initialGeoLocationReducer from "./initialGeoLocation";
import { INITIAL_GEOLOCATION } from "../constants";

describe("initialGeoLocation Reducer", () => {
  it("had a default state", () => {
    expect(
      initialGeoLocationReducer(undefined, { type: "unexpected" })
    ).toEqual(null);
  });

  it("had INITIAL_GEOLOCATION state", () => {
    expect(
      initialGeoLocationReducer(
        { initialGeoLocation: { lat: 30, lng: 120 } },
        {
          type: INITIAL_GEOLOCATION,
          initialGeoLocation: { lat: 40, lng: 140 }
        }
      )
    ).toEqual({
      lat: 40,
      lng: 140
    });
  });
});
