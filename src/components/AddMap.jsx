import { useState } from 'react';
import axios from 'axios';
import { AppBar, Paper, Box, Grid, TextField, Button, Card, CardContent, Typography } from '@mui/material';
import './AddMap.css'
import landingImage from '../assets/landingImage.png'
import { v4 as uuidv4 } from 'uuid'
import { json } from 'react-router-dom';
// import ImgurClient from 'imgur';

// const client = new ImgurClient({ clientId: `process.env.CLIENT_ID` });

const AddMap = (props) => {
  const [mapName, setMapName] = useState("");
  const [creator, setCreator] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileUpload = async () => {
    // e54fcaa0f3a4ec262ef03745647f3cf1

    // const clientId = "6d207e02198a847aa98d0a2a901485a5"
    // const auth = "Client-ID " + clientId;

      // const formData = new FormData();
      // formData.append("image", selectedFile);

    //   return axios.post("https://freeimage.host/api/1/upload", formData, {
    //     headers: {
    //       "Authorization": auth,
    //     },
    //     datatype: "json",
    //   })
    // }

      const formData = new FormData();
      formData.append("image", selectedFile);

      return axios.post("https://api.imgbb.com/1/upload?key=e54fcaa0f3a4ec262ef03745647f3cf1", formData)
    }

  }

  const handleSave = () => {
    const map = {
      id: uuidv4(),
      mapName,
      creator,
    }

    onFileUpload()
      .then((res) => {
        axios.post("https://game-map-express.vercel.app/addMap", {
          ...map,
          imageLink: res.data.data.link
        })
        // bookmark page prompt
      })
      .catch((err) => alert("Failed") && console.log(err));
  }

  return (
    <>
      <AppBar position="static">
        <Typography className="navbar" variant="h3" component="div" sx={{ flexGrow: 1 }}>
          GameMap
        </Typography>
      </AppBar>
      <div className="landing">
        <div>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            className="appBox"
          >
            <Paper elevation={3} >
              <Grid>
                <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                  <Typography gutterBottom variant="h5" align="center">
                    Add your own High-res map image, and place pins wherever you want!
                  </Typography>
                  <CardContent>
                    <Typography gutterBottom variant="h6" align="center">
                      Create your map by submitting the following:
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                    Fill up the form and our team will get back to you within 24 hours.
                  </Typography> */}
                    <form>
                      <Grid container spacing={2}>
                        <Grid xs={12} item>
                          <TextField
                            id="outlined-basic"
                            placeholder="example: GTA V, RDR2, Hogwarts Legacy..."
                            label="Map Title"
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setMapName(e.target.value)}
                          />
                        </Grid>
                        <Grid xs={12} item>
                          <TextField
                            id="outlined-basic"
                            label="Creator"
                            placeholder="example: FirstName LastName"
                            variant="outlined"
                            fullWidth required
                            onChange={(e) => setCreator(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid xs={12} item>
                          <TextField
                            id="outlined-read-only-input"
                            value={selectedFile?.name}
                            placeholder="ExampleFileName.jpeg"
                            variant="outlined"
                            fullWidth required
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => {
                              if (mapName && creator && selectedFile) {
                                handleSave()
                              }
                              alert('Map details not saved')
                            }}
                          >Create Map</Button>
                        </Grid>

                      </Grid>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
            </Paper>
          </Box>
        </div>
        <div>
          <img src={landingImage} width="497em" alt="GTA V Pin map example" />
        </div>
      </div>
    </>
  );
}

export default AddMap;
