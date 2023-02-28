import { useState, useCallback } from "react";
import { useMap, useMapEvent } from "react-leaflet/hooks";
import axios from "axios";
import moment, { relativeTimeRounding } from "moment";
import { v4 as uuidv4 } from 'uuid'
import Marker from "./Marker";
import AddPinDialog from "./AddPinDialog";
import EditPinDialog from "./EditPinDialog";


const MapHandler = (props) => {
  const { uuid, pins, setPins, categories, setCategories } = props
  const [tempMarker, setTempMarker] = useState(null);
  const [tempEditPin, setTempEditPin] = useState({
    id: "",
    title: "",
    category: "",
    note: ""
  })
  const [tempMovePin, setTempMovePin] = useState({
    id: "",
    xCoordinate: "",
    yCoordinate: ""
  })
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const map = useMap();

  /**
   * @param {string} mapID - The uuid of the map.
   * @param {number} xCoordinate - The temp xCoordinate.
   * @param {number} yCoordinate - The temp yCoordinate.
   * @param {number} category - The category ID.
   * @param {string} title - The title of the pin.
   * @param {string} note - The note of the pin.
   * @param {string} screenshot - imgur url of screenshot.
   */
  const savePin = (mapID, title, category, note) => {
    console.log('catttt', category)
    const pin = {
      id: uuidv4(),
      mapID: mapID,
      xCoordinate: tempMarker.lat,
      yCoordinate: tempMarker.lng,
      category: category,
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
      title: title,
      note: note,
      // screenshot
    }

    axios.post('http://localhost:3003/addPin', {
      ...pin,
      category: category.id
    })
      .then((res) => {
        console.log(pins)
        // console.log('pins', [...pins, pin])
        if (pins) {
          setPins((prevState) => [
            ...prevState, pin
          ])
        } else {
          setPins([pin])
        }
      })

    // Saving marker to state.
    // axios and if succesful save marker to DB, move setmarker inside axios call

    // pin has category id, change sql pin table "colour" to "category id"

  };

  const editPin = (id, title, category, note) => {

    console.log('cat2', category
    )
    const pin = {
      id: id,
      category: category,
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
      title: title,
      note: note,
      // screenshot
    }

    for (let i = 0; i < pins.length; i++) {
      if (pins[i].id === id) {
        axios.put('http://localhost:3003/editPin', {
          ...pin,
          category: category.id
        })
          .then((res) => {
            // clone pins array
            const tempPins = [...pins]

            console.log('cat', category)

            // modify element incloned array
            tempPins[i] = {
              ...tempPins[i],
              ...pin
            }

            // update pins array with edited pin
            setPins(tempPins)
          })
      }
    }
  }

  const onEdit = (id, title, category, note) => {
    setEditDialogOpen(true)
    setTempEditPin({
      id: id,
      title: title,
      category: category,
      note: note
    })
  }

  const onMove = (id, xCoordinate, yCoordinate) => {
    // make pin draggable

    // wrong place for setTempMovePin, should be set when pin is dropped again
    setTempMovePin({
      id: "",
      xCoordinate: "",
      yCoordinate: ""
    })

  }

  // edit button opens new pin dialog - done

  // user fills out form - done

  // user clicks done

  // react takes in form details

  // react updates pin state array

  // react send axios.put call using {
  // object 
  // }

  // backend app.put bodyparser
  // req.body.title
  // req.body.

  // helper function update sql query where id = 

  // }

  const deletePin = (id) => {
    for (let i = 0; i < pins.length; i++) {
      if (pins[i].id === id) {
        axios.delete(`http://localhost:3003/deletePin?id=${id}`)
          .then((res) => {
            const newPins = [...pins]
            newPins.splice(i, 1)
            setPins(newPins)
          })
      }
    }
  }

  const saveCategory = async (label, colour) => {
    const category = {
      mapID: uuid,
      label: label,
      colour: colour
    }

    await axios.post('http://localhost:3003/addCategory', category)
      .then(() => {
        // console.log('cat', categories)
        setCategories((prevState) => [...prevState, category])
        return true
      })

    return false
  }

  const deleteCategory = (id) => {
    axios.delete(`http://localhost:3003/deleteCategory?id=${id}`)
      .then((res) => {
        setCategories(categories.filter(elem => elem.id !== id))
      })
  }

  const onDoubleClick = useCallback(
    (e) => {
      map.setView(e.latlng, map.getZoom());
      // Bring up MUI dialog with category selector
      setDialogOpen(true);
      setTempMarker({
        lat: e.latlng.lat,
        lng: e.latlng.lng
      });
    },
    // Lat:631, Lng: 615.5
    [map]
  );
  useMapEvent("dblclick", onDoubleClick);

  return (
    <>
      <AddPinDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        savePin={savePin}
        uuid={uuid}
        categories={categories}
        setCategories={setCategories}
        saveCategory={saveCategory}
        deleteCategory={deleteCategory}
      />
      <EditPinDialog
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        editPin={editPin}
        uuid={uuid}
        categories={categories}
        setCategories={setCategories}
        saveCategory={saveCategory}
        tempEditPin={tempEditPin}
        deleteCategory={deleteCategory}
      />
      {pins && pins.map((marker, index) => (
        <Marker marker={marker} key={index} deletePin={deletePin} onEdit={onEdit} onMove={onMove} />
      ))}
    </>
  );
};

export default MapHandler;
