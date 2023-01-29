import { Marker as LeafletMarker, Popup } from "react-leaflet";

const Marker = (props) => {
  const { latlng, category, description } = props.marker;
  return (
    <LeafletMarker position={[latlng.lat, latlng.lng]}>
      <Popup>
        {category.colour} | {category.label} <br /> {description}
      </Popup>
    </LeafletMarker>
  );
};

export default Marker;
