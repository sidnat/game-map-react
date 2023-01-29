import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Autocomplete,
} from "@mui/material";
import ColourPicker from "./ColourPicker";

const AddPinDialog = (props) => {
  // replace with list of categories from props list of pins
  const categories = [
    { label: "House", colour: {
        "r": 129,
        "g": 112,
        "b": 99,
        "a": 1
    } },
    { label: "Mission", colour: {
        "r": 129,
        "g": 4,
        "b": 99,
        "a": 1
    } },
  ];

  const [inputs, setInputs] = useState({
    category: "",
    description: "",
  });

  const onAdd = () => {
    props.setDialogOpen(false);
    props.savePin(inputs.category, inputs.description);
  };

  return (
    <Dialog open={props.dialogOpen} onClose={() => props.setDialogOpen(false)}>
      <DialogTitle>Add A Pin</DialogTitle>
      <DialogContent>
        <Autocomplete
          disablePortal
          freeSolo
          options={categories}
          sx={{ width: 300 }}
          // set defualt value to the first available value from categories you populate above
          value={inputs.category}
          onChange={(e, newValue) => {
            setInputs((prevState) => ({ ...prevState, category: newValue }));
          }}
          renderInput={(params) => <TextField {...params} label="Categories" />}
        />
        <ColourPicker />
        <TextField
          label="Description"
          multiline
          rows={4}
          value={inputs.description}
          onChange={(e) => {
            setInputs((prevState) => ({
              ...prevState,
              description: e.target.value,
            }));
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setDialogOpen(false)}>Cancel</Button>
        <Button onClick={() => onAdd()}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPinDialog;
