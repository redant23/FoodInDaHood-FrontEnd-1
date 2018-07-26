import React, { Component, Fragment } from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDLoqJ1W1fexc-GcnUjpxPw41NxZYRKDhk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }}>Searching...</div>,
    containerElement: <div style={{ height: `300px`, width: `375px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => {
  if (props.initialGeoLocation) {
    var lat = props.initialGeoLocation.lat;
    var lng = props.initialGeoLocation.lng;
  }

  return (
    <Fragment>
      {props.initialGeoLocation && (
        <GoogleMap defaultZoom={15} defaultCenter={{ lat, lng }}>
          {props.isMarkerShown &&
            props.vendorList.map((vendor, index) => (
              <Marker
                key={index}
                position={{ lat: vendor.lat, lng: vendor.lng }}
                onClick={props.onToggleOpen}
              >
                {props.isOpen && (
                  <InfoWindow onCloseClick={props.onToggleOpen}>
                    <span>{vendor.title}</span>
                  </InfoWindow>
                )}
              </Marker>
            ))}
        </GoogleMap>
      )}
    </Fragment>
  );
});

export default Map;
