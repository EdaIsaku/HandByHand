import { useState } from "react";
import { useMapEvents, Marker } from "react-leaflet";

const MarkerOnClick = () => {
  const [markers, setMarkers] = useState([[41.33, 19.82]]);

  const map = useMapEvents({
    click: (e) => {
      const marker = [e.latlng.lat, e.latlng.lng];
      markers.push(marker);
      setMarkers(markers);
      <Marker position={{ lat: 41.15, lng: 19.82 }} />;
    },
  });
  return null;
};
export default MarkerOnClick;
