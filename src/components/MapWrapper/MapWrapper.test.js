import React from "react";
import MapWrapper from "./MapWrapper";
import Map from "../Map/Map";
import { createRenderer } from "react-test-renderer/shallow";
import { shallow } from "enzyme";

const setup = (
  initialGeoLocation,
  vendorList,
  vendorListDistance,
  markerInfoWindow
) => {
  const actions = {
    updateMarkerInfoWindowStatus: jest.fn()
  };

  const component = shallow(
    <MapWrapper
      initialGeoLocation={initialGeoLocation}
      vendorList={vendorList}
      vendorListDistance={vendorListDistance}
      markerInfoWindow={markerInfoWindow}
      {...actions}
    />
  );

  return {
    component: component,
    actions: actions,
    button: component.find("button")
  };
};

const zoomLevelCalculator = distance => {
  if (distance === 100) {
    return 16;
  } else if (distance === 500) {
    return 15;
  } else if (distance === 1000) {
    return 14;
  } else if (distance === 2000) {
    return 13;
  } else if (distance === 4000) {
    return 12;
  }
};

describe("MapWrapper Component", () => {
  it("has initial state of true of isMarkerShown", () => {
    const { component } = setup();
    const countState = component.state().isMarkerShown;
    expect(countState).toEqual(true);
  });

  it("has one component", () => {
    const { component } = setup();
    const length = component.length;
    expect(length).toEqual(1);
  });
});
