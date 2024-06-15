import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import { useContext, useEffect, useRef } from "react";
import { WeatherContext } from "../../context";
import { weatherApiInstance } from "../../api";
import {
  SET_ERROR,
  SET_LOADING,
  SET_WEATHER_DATA,
} from "../../context/actions";
import "leaflet/dist/leaflet.css";
import styles from "./styles.module.css";

const LocationSelector: React.FC<{
  onLocationSelected: (lat: number, lon: number) => void;
}> = ({ onLocationSelected }) => {
  const longPressTimer = useRef<number|null>(null);
  useMapEvents({
    mousedown(e) {
      // Start a timer on mousedown
      longPressTimer.current = setTimeout(() => {
        const { lat, lng } = e.latlng;
        onLocationSelected(lat, lng);
      }, 2000); // 2000ms = 1s
    },
    click(e) {
      // Check if the Shift key is pressed during the click event
      if (e.originalEvent.shiftKey) {
        const { lat, lng } = e.latlng;
        onLocationSelected(lat, lng);
      }
    },
  });

  return null;
};

const ChangeMapView: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    const zoomLevel = 10;
    const flyToOptions = {
      animate: true,
      duration: 2,
    };

    map.flyTo(center as LatLngExpression, zoomLevel, flyToOptions);
  }, [center, map]);

  return null;
};

function MapDisplay() {
  const { state, dispatch } = useContext(WeatherContext);
  const position: [number, number] = [
    state.data?.coord.lat || 28.7041,
    state.data?.coord.lon || 77.1025,
  ]; // Default to Delhi, India

  const customIcon = new Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const handleCoordinateChange = async (lat: number, lon: number) => {
    dispatch({ type: SET_LOADING, payload: "PENDING" });
    await weatherApiInstance
      .get("/weather", {
        params: { lat, lon },
      })
      .then((response) => {
        dispatch({ type: SET_WEATHER_DATA, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: SET_ERROR, payload: error.message });
      })
      .finally(() => {
        dispatch({ type: SET_LOADING, payload: "IDLE" });
      });
  };

  return (
    <>
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
        <LocationSelector onLocationSelected={handleCoordinateChange} />
        <ChangeMapView center={position} />
      </MapContainer>
      <p style={{ textAlign: "center" }}>
       <p> To change location do <code>shift + click</code> or <code>long press</code> on the Map</p>
      </p>
    </>
  );
}

export default MapDisplay;
