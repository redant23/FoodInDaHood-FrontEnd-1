import React, { Fragment } from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import "./Map.css";

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDLoqJ1W1fexc-GcnUjpxPw41NxZYRKDhk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }}>Searching...</div>,
    containerElement: <div style={{ height: `300px`, width: `375px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
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
        <GoogleMap
          zoom={props.zoomLevel}
          defaultZoom={14}
          defaultCenter={{ lat, lng }}
        >
          <Marker
            position={{ lat, lng }}
            animation={window.google.maps.Animation.DROP}
          />
          {props.isMarkerShown &&
            props.vendorList.map((vendor, index) => (
              <Marker
                key={index}
                position={{ lat: vendor.lat, lng: vendor.lng }}
                onClick={() => {
                  if (!props.markerInfoWindow.includes(vendor._id)) {
                    props.updateMarkerInfoWindowStatus(vendor._id, "open");
                  }
                }}
                icon="https://process.filestackapi.com/AhTgLagciQByzXpFGRI0Az/resize=width:30/https://cdn.iconscout.com/public/images/icon/premium/png-512/food-truck-car-transport-machine-movement-transportation-3486058b4a238844-512x512.png"
              >
                {props.markerInfoWindow.indexOf(vendor._id) !== -1 && (
                  <InfoWindow
                    onCloseClick={() => {
                      props.updateMarkerInfoWindowStatus(vendor._id, "close");
                    }}
                  >
                    <div>
                      <img className="info-window-img" src={vendor.img_url} />
                      <h5np>{vendor.title}</h5>
                    </div>
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
