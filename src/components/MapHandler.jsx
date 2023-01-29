import { useState, useCallback } from "react";
import { useMap, useMapEvent } from "react-leaflet/hooks";
import Marker from "./Marker";
import AddPinDialog from "./AddPinDialog";

const MapHandler = () => {
  const [markers, setMarkers] = useState([]);
  const [tempMarker, setTempMarker] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const map = useMap();

  const savePin = (category, description) => {
    // Saving marker to state.
    // axios and if succesful save marker to DB, move setmarker inside axios call
    setMarkers((prevState) => [
      ...prevState,
      { ...tempMarker, category, description },
    ]);
  };

  const onDoubleClick = useCallback(
    (e) => {
      map.setView(e.latlng, map.getZoom());
      // Bring up MUI dialog with category selector
      setDialogOpen(true);
      setTempMarker({ latlng: e.latlng });
    },
    [map]
  );
  useMapEvent("dblclick", onDoubleClick);

  return (
    <>
      <AddPinDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        savePin={savePin}
      />
      {markers.map((marker, index) => (
        <Marker marker={marker} key={index} />
      ))}
    </>
  );
};

export default MapHandler;
