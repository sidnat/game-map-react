import L from "leaflet";
import { useMap } from "react-leaflet/hooks";

const MapComponent = (props) => {
  const map = useMap();

  const bounds = [
    [-26.5, -25],
    [1021.5, 1023],
  ];
  const image = L.imageOverlay(props.imageLink, bounds).addTo(map);

  map.fitBounds(image.getBounds());
};

export default MapComponent;
