import React, { Component, Fragment } from "react";
import Map from "../Map/Map";

class MapWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMarkerShown: true
    };
  }

  componentDidMount() {
    // this.delayedShowMarker();
  }

  handleMarkerClick = () => {
    //
  };

  zoomLevelCalculator = distance => {
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

  render() {
    return (
      <Fragment>
        <Map
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          initialGeoLocation={this.props.initialGeoLocation}
          vendorList={this.props.vendorList}
          zoomLevel={this.zoomLevelCalculator(this.props.vendorListDistance)}
        />
      </Fragment>
    );
  }
}

export default MapWrapper;
