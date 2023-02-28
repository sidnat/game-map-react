import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MapContainer } from "react-leaflet";
import { CRS } from "leaflet";
import MapComponent from "./MapComponent";
import MapHandler from "./MapHandler";
import { AppBar, Typography } from "@mui/material";
import './Map.css'

const Map = () => {
  const [map, setMap] = useState(null)
  const [pins, setPins] = useState([])
  const [categories, setCategories] = useState([])
  let { uuid } = useParams();

  useEffect(() => {
    axios.get(`https://game-map-express.vercel.app/getMapPinsCategories?uuid=${uuid}`)
      .then((results) => {
        const { map, pins, categories } = results.data

        if (pins) {
          for (let pin of pins) {
            if (categories) {
              for (let category of categories) {
                if (pin.category === category.id) {
                  pin.category = {
                    id: category.id,
                    label: category.label,
                    colour: category.colour
                  }
                }
              }
            }
          }
        }

        console.log(pins)

        setMap(map)
        setPins(pins || [])
        setCategories(categories || [])
      })
  }, [])

  // http://localhost:3000/c94cbfd0-ccc9-40d7-a1c9-57b6390efb93
  // load hardcoded uuid from backend and show the image, mapName, Creator on screen

  return (
    map && (
      <>
        <AppBar position="static">
          <Typography className="navbar" variant="h6" component="div" sx={{ flexGrow: 1 }}>

          </Typography>
          <Typography className="navbar" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Map: {map.map_name} ~ GAMEMAP ~ Creator: {map.creator}
          </Typography>
        </AppBar>
        <MapContainer
          minZoom={0}
          crs={CRS.Simple}
          maxBoundsViscosity={1.0}
          boundsOptions={{ padding: [50, 50] }}
          style={{ height: "100vh", width: "100vw" }}
        >
          <MapComponent imageLink={map.image_link} />
          <MapHandler
            uuid={uuid}
            pins={pins}
            setPins={setPins}
            categories={categories}
            setCategories={setCategories} />
        </MapContainer>
      </>
    )
  );
}

export default Map;