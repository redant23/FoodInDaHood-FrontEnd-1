import React from "react";
import FilterBox from "./FilterBox";

import { shallow } from "enzyme";

function setup() {
  const actions = {
    onDistanceClick: jest.fn(),
    handleUpdateVendorListFilterStatus: jest.fn()
  };

  const component = shallow(
    <FilterBox vendorListFilterStatus={vendorListFilterStatus} {...actions} />
  );

  return {
    component: component,
    actions: actions,
    button: component.find(".filter-distance"),
    filterByDistance: component.find(".filter-by-distance"),
    filterByFavorite: component.find(".filter-by-favorite"),
    filterByComment: component.find(".filter-by-comment"),
    filterBoxBtn: component.find(".filter-box-btn")
  };
}

var vendorListFilterStatus = {
  isByDistance: true,
  isByFavorite: false,
  isByComment: false
};

function distanceEvent(inputClass) {
  return {
    target: {
      classList: {
        contains: function(className) {
          if (className === inputClass) return true;
        }
      }
    }
  };
}

function filterEvent(inputClass) {
  return {
    target: {
      classList: {
        contains: function(className) {
          if (className === inputClass) return true;
        }
      }
    }
  };
}

describe("FilterBox Component", () => {
  it("has initial state of false of isConsoleOpen", () => {
    const { component } = setup();

    const isConsoleOpen = component.state().isConsoleOpen;
    expect(isConsoleOpen).toEqual(false);
  });

  it("changes isConsoleOpen state when it is clicked", () => {
    const { component, filterBoxBtn } = setup();

    filterBoxBtn.simulate("click");
    const isConsoleOpen = component.state().isConsoleOpen;
    expect(isConsoleOpen).toEqual(true);
  });

  it("should call onDistanceClick and return value", () => {
    const { button, actions } = setup();
    button.at(0).simulate("click", distanceEvent("distance-100"));
    expect(actions.onDistanceClick).toBeCalledWith(100);

    button.at(1).simulate("click", distanceEvent("distance-500"));
    expect(actions.onDistanceClick).toBeCalledWith(500);

    button.at(2).simulate("click", distanceEvent("distance-1000"));
    expect(actions.onDistanceClick).toBeCalledWith(1000);

    button.at(3).simulate("click", distanceEvent("distance-2000"));
    expect(actions.onDistanceClick).toBeCalledWith(2000);

    button.at(4).simulate("click", distanceEvent("distance-4000"));
    expect(actions.onDistanceClick).toBeCalledWith(4000);
  });

  it("should call handleUpdateVendorListFilterStatus and return value", () => {
    const {
      filterByDistance,
      filterByFavorite,
      filterByComment,
      actions
    } = setup();

    filterByDistance.simulate("click", filterEvent("filter-by-distance"));
    expect(actions.handleUpdateVendorListFilterStatus).toBeCalledWith(
      "distance"
    );

    filterByFavorite.simulate("click", filterEvent("filter-by-favorite"));
    expect(actions.handleUpdateVendorListFilterStatus).toBeCalledWith(
      "favorite"
    );

    filterByComment.simulate("click", filterEvent("filter-by-comment"));
    expect(actions.handleUpdateVendorListFilterStatus).toBeCalledWith(
      "comment"
    );
  });
});
