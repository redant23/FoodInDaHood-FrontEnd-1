import markerInfoWindowReducer from "./markerInfoWindow";

import {
  OPEN_MARKER_INFO_WINDOW,
  CLOSE_MARKER_INFO_WINDOW
} from "../constants";

describe("markerInfoWindow Reducer", () => {
  it("had a default state", () => {
    expect(markerInfoWindowReducer(undefined, { type: "unexpected" })).toEqual(
      []
    );
  });

  it(`can handle ${OPEN_MARKER_INFO_WINDOW}`, () => {
    expect(
      markerInfoWindowReducer(["abcdef11111"], {
        type: OPEN_MARKER_INFO_WINDOW,
        id: "abcdef22222"
      })
    ).toEqual(["abcdef11111", "abcdef22222"]);
  });

  it(`can handle ${CLOSE_MARKER_INFO_WINDOW}`, () => {
    expect(
      markerInfoWindowReducer(["abcdef11111", "abcdef22222"], {
        type: CLOSE_MARKER_INFO_WINDOW,
        id: "abcdef22222"
      })
    ).toEqual(["abcdef11111"]);
  });
});
