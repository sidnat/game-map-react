import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MapContainer } from "react-leaflet";
import { CRS } from "leaflet";
import MapComponent from "./MapComponent";
import MapHandler from "./MapHandler";

const Map = () => {
	const [map, setMap] = useState(null)
	const [pins, setPins] = useState(null)
	let { uuid } = useParams();

	useEffect(() => {
		axios.get(`http://localhost:3003/getMapAndPins?uuid=${uuid}`)
			.then((results) => {
				setMap(results.data.map)
				setPins(results.data.pins)
			})
	}, [])

  // c94cbfd0-ccc9-40d7-a1c9-57b6390efb93
  // load hardcoded uuid from backend and show the image, mapName, Creator on screen

	return (
    map && (
      <>
        {map.map_name}
        {map.creator}
        <MapContainer
          minZoom={0}
          crs={CRS.Simple}
          maxBoundsViscosity={1.0}
          boundsOptions={{ padding: [50, 50] }}
          style={{ height: "100vh", width: "100vw" }}
        >
          <MapComponent imageLink={map.image_link} />
          <MapHandler uuid={uuid} />
        </MapContainer>
      </>
    )
  );
}

export default Map;