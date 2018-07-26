import React, { Component, Fragment } from "react";
import Map from "../Map/Map";

class MapWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMarkerShown: false
    };
  }

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  render() {
    return (
      <Fragment>
        <Map
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          initialGeoLocation={this.props.initialGeoLocation}
          vendorList={this.props.vendorList}
        />
      </Fragment>
    );
  }
}

export default MapWrapper;
