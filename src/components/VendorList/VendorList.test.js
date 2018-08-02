import React from "react";
import VendorList from "./VendorList";
import { shallow } from "enzyme";

function setup(
  vendorList = [{ favorites: [], comments: [], address: "서울시 서초구", _id: 1 }],
  initialGeoLocation = { lat: 30, lng: 126 },
  isScrollLoadingActive = false
) {
  const actions = {
    handleClick: jest.fn()
  };

  const component = shallow(
    <VendorList
      vendorList={vendorList}
      initialGeoLocation={initialGeoLocation}
      isScrollLoadingActive={isScrollLoadingActive}
      {...actions}
    />
  );

  return {
    component: component,
    actions: actions,
    button: component.find(".vendor-list-item"),
    detailDiv: component.find(".vendor-list-detail")
  };
}

const event = { currentTarget: { dataset: { id: 1 } } };

describe("VendorList Component", () => {
  it("handles vendor list detail", () => {
    const { button, actions } = setup();
    button.simulate("click", event);
    expect(actions.handleClick).toBeCalledWith(1);
  });

  it("matches proper address", () => {
    const { detailDiv } = setup();
    expect(detailDiv.childAt(0).text()).toMatch("서초구");
  });
});
