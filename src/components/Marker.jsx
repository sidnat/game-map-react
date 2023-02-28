import { Marker as LeafletMarker, Popup } from "react-leaflet";
import { Button } from "@mui/material";
import { useRef } from 'react'
import './Marker.css'
import dateFormatter from "../utils/dateFormatter"
import iconColourSelector from "../utils/iconColourSelector"
// import { useMap } from "react-leaflet/hooks";

const Marker = (props) => {
  // make latlng object to 2 things, here and everywhere. add color prop, get color from props.marker, depending on colour, change iconRed etc
  const { deletePin, onEdit, onMove } = props
  const { id, xCoordinate, yCoordinate, title, category, note, time } = props.marker;

  const popupElRef = useRef(null);

  const colour = category.colour
  const icon = iconColourSelector(colour)

  // 02/15/2023 14:25 or 2:25pm
  const newTime = new Date(time)

  // font style https://fonts.google.com/specimen/Press+Start+2P?category=Display
  // https://fonts.google.com/specimen/Silkscreen?category=Display
  // clock style? https://fonts.google.com/specimen/Lobster+Two?category=Display


  // const map = useMap();

  // const hideElement = () => {
  //   if (!popupElRef.current || !map) return;
  //   popupElRef.current._close();
  //   // map.closePopup();
  // };

  //very weird 2023-02-10T09:12:11.000Z
  // console.log(time)

  return (
    // leafletmarker requires position array of lat xcoord and long ycoord
    <LeafletMarker position={[xCoordinate, yCoordinate]} icon={icon}>
      <Popup ref={popupElRef}>
        Time: {dateFormatter(newTime)}
        <h2>Title: {title}</h2>
        <h4>Category: {category.label ? category.label : "No Category Exists"}</h4>
        <h4>Note: {note}</h4>
        {/* {screenshot && screenshot} */}
        <div className="buttonspacing">
          <Button onClick={() => { onMove(id, xCoordinate, yCoordinate) }}>
            Move
          </Button>
          <Button onClick={() => { onEdit(id, title, category, note) }}>
            Edit
          </Button>
          {/* handleDelete() in button onclick */}
          <Button onClick={() => { deletePin(id) }}>
            Delete
          </Button>
        </div>
      </Popup>
    </LeafletMarker>
  );
};

export default Marker;
