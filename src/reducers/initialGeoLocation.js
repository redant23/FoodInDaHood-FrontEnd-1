import { INITIAL_GEOLOCATION } from "../constants";

const initialGeoLocationReducer = (state = null, action) => {
  switch (action.type) {
    case INITIAL_GEOLOCATION:
      return action.initialGeoLocation;
    default:
      return state;
  }
};

export default initialGeoLocationReducer;
