import React, { useState, useContext } from "react";
import "./Map.scss";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { SearchControl, OpenStreetMapProvider } from "react-leaflet-geosearch";
import MarkerOnClick from "../Marker/Marker";
import User from "../User/User";
import { FaSearch } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa";

import { InfoContext } from "../InfoContext/InfoContext";

const Map = () => {
  const [center, setCenter] = useState({ lat: 41.33, lng: 19.82 });
  const [showInfo, setShowInfo] = useContext(InfoContext);

  //geoSearch
  const prov = OpenStreetMapProvider();
  const GeoSearchControlElement = SearchControl;

  const handleShowInfo = (ev) => {
    let elemClicked = Array.from(ev.target.classList);
    // shiko dallimin e target vs currentTarget
    console.log("target:", ev.target, "currentTarget:", ev.currentTarget);
    if (
      elemClicked.includes("user") ||
      elemClicked.includes("initials") ||
      ev.target.parentNode.classList[0] === "initials"
    ) {
    } else {
      setShowInfo(false);
    }
  };

  return (
    <div className="map" onClick={handleShowInfo}>
      <MapContainer
        center={center}
        zoom={16}
        scrollWheelZoom={false}
        className="map"
        whenReady={(map) => {
          map.target.on("click", function (ev) {
            // console.log(ev.latlng);
          });
        }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoSearchControlElement
          provider={prov}
          showMarker={true}
          showPopup={false}
          maxMarkers={20}
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={true}
          searchLabel={"Search places"}
          keepResult={true}
          countrycodes={"al"}
          popupFormat={({ query, result }) => result.label}
        />
        <FaMapPin className="icon icon__pin" />
        <FaSearch className="icon icon__search" />
        <User />
        <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <MarkerOnClick />
      </MapContainer>
    </div>
  );
};

export default Map;
