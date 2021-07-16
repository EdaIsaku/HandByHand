import React from "react";
import "./Map.scss";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  google,
  maps,
} from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
// import Searchbar from "../SearchBox/SearchBox";
// import Component from "../SearchBox/SearchBox";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const MyMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCkqHz43tEUUEqaCDqIX-gfn4ejJl57Boo&libraries=places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: 41, lng: 19 }}>
    {props.isMarkerShown && (
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    )}
    {/* <Searchbar controlPosition={google.ControlPosition.TOP_LEFT} /> */}
    <GooglePlacesAutocomplete
      api="AIzaSyCkqHz43tEUUEqaCDqIX-gfn4ejJl57Boo"
      onChange={(res) => {
        console.log(res);
      }}
    />
  </GoogleMap>
));

const MyMapComponent = () => {
  return (
    <div className="map">
      <MyMap />
    </div>
  );
};

export { MyMapComponent };

/* 
You must enable Billing on the Google Cloud Project at https://console.cloud.google.com/project/_/billing/enable Learn more at https://developers.google.com/maps/gmp-get-started Places API error: BillingNotEnabledMapError
https://developers.google.com/maps/documentation/javascript/error-messages#billing-not-enabled-map-error
*/
