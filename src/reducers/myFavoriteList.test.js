import myFavoriteListReducer from "./myFavoriteList";
import { UPDATE_MY_FAVORITE_LIST } from "../constants";

describe("myFavoriteList Reducer", () => {
  it("had a default state", () => {
    expect(myFavoriteListReducer(undefined, { type: "unexpected" })).toEqual(
      []
    );
  });

  it(`can handle ${UPDATE_MY_FAVORITE_LIST}`, () => {
    expect(
      myFavoriteListReducer([], {
        type: UPDATE_MY_FAVORITE_LIST,
        myFavoriteList: ["list1", "list2", "list3"]
      })
    ).toEqual(["list1", "list2", "list3"]);
  });
});
