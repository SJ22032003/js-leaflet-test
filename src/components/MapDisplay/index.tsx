import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useContext } from "react";
import { WeatherContext } from "../../context";
import "leaflet/dist/leaflet.css";
import styles from "./styles.module.css";


function MapDisplay() {
  const { state } = useContext(WeatherContext);
  const position: [number, number] = [state.data?.coord.lat || 0, state.data?.coord.lon || 0];

  const customIcon = new Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer
      center={position}
      zoom={10}
      scrollWheelZoom={false}
      className={styles.mapContainer}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>{state.data?.name || ""}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapDisplay;
