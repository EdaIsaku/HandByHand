import "./Map.scss";
import React, { useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { SearchControl, OpenStreetMapProvider } from "react-leaflet-geosearch";
import MarkerOnClick from "../Marker/Marker";
import User from "../User/User";
import { FaMapPin } from "react-icons/fa";
import isLoadingHOC from "../isLoadingHOC";

import Modal from "../Modal/Modal";

import { SharedStateContext } from "../SharedState/SharedState";
import { auth } from "../../firebase";

const Map = () => {
  console.log();
  const [center, setCenter] = useState({ lat: 41.33, lng: 19.82 });
  const [sharedState, setSharedState] = useContext(SharedStateContext);
  const [markers, setMarkers] = useState([center]);
  //geoSearch
  const prov = OpenStreetMapProvider();
  const GeoSearchControlElement = SearchControl;

  const handleShowInfo = (ev) => {
    let elemClicked = Array.from(ev.target.classList);
    // shiko dallimin e target vs currentTarget
    // console.log("target:", ev.target, "currentTarget:", ev.currentTarget);
    if (
      elemClicked.includes("user") ||
      elemClicked.includes("initials") ||
      ev.target.parentNode.classList[0] === "initials"
    ) {
    } else if (sharedState.showInfo === true) {
      setSharedState((prevState) => ({
        ...prevState,
        showInfo: !sharedState.showInfo,
      }));
    }
  };

  const addMarker = (ev) => {
    markers.push({ lat: ev.latlng.lat, lng: ev.latlng.lng });
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
            if (ev.originalEvent.target.classList[0] === "map") {
              addMarker(ev);
              setSharedState((prevState) => ({
                ...prevState,
                closedModal: false,
              }));
            }
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
        <User />
        {markers.map((pos, idx) => {
          <Marker position={pos} key={idx}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>;
        })}
        <MarkerOnClick />
        <Modal />
      </MapContainer>
    </div>
  );
};

export default isLoadingHOC(Map);
