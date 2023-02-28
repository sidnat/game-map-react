import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Select,
  MenuItem,
  Typography,
  Grid,
  Card,
  InputLabel,
  FormControl
} from "@mui/material";
import ColourPicker from "./ColourPicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import './AddPinDialog.css'

const EditPinDialog = (props) => {
  const {
    categories,
    saveCategory,
    editPin,
    editDialogOpen,
    setEditDialogOpen,
    deleteCategory,
  } = props
  const {
    id,
    title,
    category,
    note
  } = props.tempEditPin
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [inputs, setInputs] = useState({
    title: "",
    category: "",
    note: "",
  });
  const [colour, setColour] = useState('#000000')

  const onColourChange = (color) => {
    setColour(color.hex)
  }

  const submitEdit = () => {
    setEditDialogOpen(false);

    // if field left unchanged, use current value
    let editTitle = inputs.title ? inputs.title : title
    let editCategory = inputs.category ? inputs.category : category
    let editNote = inputs.note ? inputs.note : note

    editPin(id, editTitle, editCategory, editNote);
  };

  return (
    <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
      <Typography gutterBottom variant="h4" align="center">
        Edit Pin
      </Typography>
      <DialogContent>
        <Grid>
          <Card style={{ maxWidth: 300, padding: "20px 5px", margin: "0 auto" }}>
            <TextField
              label="Title"
              sx={{ width: 275 }}
              onChange={(e) => {
                setInputs((prevState) => ({
                  ...prevState,
                  title: e.target.value
                }))
              }}
            >
            </TextField>
            <Button onClick={() => {
              setShowAddCategory((prevState) => (!prevState))
            }}>
              {showAddCategory ? "select existing category" : "add new category"}
            </Button>
            {!showAddCategory ? (
              <>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Categories"
                    sx={{ width: 275 }}
                    onChange={(e, newValue) => {
                      setInputs((prevState) => ({ ...prevState, category: newValue.props.value }));
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category}>
                        <div className="catDelete">
                          {category.label}
                          <FontAwesomeIcon icon={faX} onClick={() => {
                            deleteCategory(category.id)
                          }}
                          />
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            ) : (
              <>
                <TextField
                  label="New Category"
                  sx={{ width: 275 }}
                  onChange={(e) => {
                    setInputs((prevState) => ({ ...prevState, category: e.target.value }));
                  }}
                />
                <ColourPicker onColourChange={onColourChange} />
                <Button onClick={() => {
                  if (inputs.category && colour) {
                    if (saveCategory(inputs.category, colour)) {
                      setShowAddCategory(false)
                    }
                  } else {
                    alert('Category not saved')
                  }
                }}>
                  Save Category
                </Button>
              </>
            )}
            <TextField
              label="Note"
              sx={{ width: 275 }}
              multiline rows={4}
              onChange={(e) => {
                setInputs((prevState) => ({
                  ...prevState,
                  note: e.target.value
                }));
              }}
            />
          </Card>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
        <Button onClick={() => {
          if (inputs.title || inputs.category || inputs.note) {
            submitEdit()
          } else {
            alert('Edit not saved')
          }
        }}
        >Save Edit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPinDialog;
