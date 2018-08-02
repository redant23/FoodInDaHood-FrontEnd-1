import authoriziedUserDataReducer from "./authorizedUserData";
import { UPDATE_AUTHORIZED_USER_DATA } from "../constants";

describe("authorizedUserData Reducer", () => {
  it("had a default state", () => {
    expect(
      authoriziedUserDataReducer(undefined, {
        type: "unexpected"
      })
    ).toEqual({
      isAuthenticated: false,
      userInfo: null,
      userToken: null
    });
  });

  it("can handle UPDATE_AUTHORIZED_USER_DATA", () => {
    expect(
      authoriziedUserDataReducer(
        {
          isAuthenticated: false,
          userInfo: null,
          userToken: null
        },
        {
          type: UPDATE_AUTHORIZED_USER_DATA,
          userData: {
            isAuthenticated: true,
            userInfo: ["user1", "user2", "user3"],
            userToken: ["token1234"]
          }
        }
      )
    ).toEqual({
      isAuthenticated: true,
      userInfo: ["user1", "user2", "user3"],
      userToken: ["token1234"]
    });
  });
});
