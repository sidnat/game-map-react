import { useState } from 'react';
import { Paper, Box, TextField, Button } from "@mui/material";
import axios from 'axios';

// const CLIENT_ID = "ad3d2380ce5d1cc"
// const SECRET = "cc304004088d1dd28c7425653b50590f2c8aa994"

const AddMap = (props) => {
  const [mapName, setMapName] = useState("");
  const [creator, setCreator] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileUpload = async () => {
    const clientId = "ad3d2380ce5d1cc"
    const auth = "Client-ID " + clientId;

    const formData = new FormData();
    formData.append("image", selectedFile);

    return axios.post("https://api.imgur.com/3/image", formData, {
      headers: {
        "Authorization": auth
      },
      datatype: "json",
    })
  }

  const handleSave = async () => {
    onFileUpload()
      .then((res) => {
        axios.post("http://localhost:3003/addMap", {
          mapName,
          creator,
          imageLink: res.data.data.link
        })
      })
      .catch((err) => alert("Failed") && console.log(err));
  }

  return (
    <Box className="appBox" >
      <Paper elevation={3} >
        <TextField
          id="outlined-basic"
          label="Map Name"
          variant="outlined"
          onChange={(e) => setMapName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Creator"
          variant="outlined"
          onChange={(e) => setCreator(e.target.value)}
        />
        <Button
          variant="contained"
          component="label"
        >
          Upload Map Image
          <input
            accept="image/*"
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            hidden
          />
        </Button>
        <Button
          onClick={() => handleSave()}
        >
          Submit
        </Button>
      </Paper>
      <Paper>
        {/* <Map /> */}
      </Paper>
    </Box>
  );
}

export default AddMap;
