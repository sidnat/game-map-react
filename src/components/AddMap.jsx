import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import instance from '../utils/axios';
import landingImage from '../assets/landingImage.png'
import { v4 as uuidv4 } from 'uuid'

const theme = createTheme();

const AddMap = () => {
  const [mapName, setMapName] = useState("");
  const [creator, setCreator] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("media", selectedFile);
    formData.append("apikey", "0000334f0bdb447fc1efc3a8efa304f7")

    return instance.post("https://thumbsnap.com/api/upload", formData)
  }

  const handleSave = () => {
    const map = {
      id: uuidv4(),
      mapName,
      creator,
    }

    onFileUpload()
      .then((res) => {
        console.log('test')
        instance.post("addMap", {
          ...map,
          imageLink: res.data.image.url
        })
        // bookmark page prompt
      })
      .catch((err) => console.log(err));
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${landingImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h3">
              GameMap
            </Typography>
            <br />
            <Typography component="h1" variant="h6">
              Add your own High-res map image, and place pins wherever you want!
            </Typography>
            <Typography component="h1" variant="h6">
              Create your map by submitting the following:
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="outlined-basic"
                label="Map Title"
                placeholder="example: GTA V, RDR2, Hogwarts Legacy..."
                autoFocus
                onChange={(e) => setMapName(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                id="outlined-basic"
                label="Creator"
                placeholder="example: FirstName LastName"
                onChange={(e) => setCreator(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  if (mapName && creator && selectedFile) {
                    handleSave()
                  }
                  // } else {
                  //   alert('Map details not saved')
                  // }
                }}
              >
                Create Map
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default AddMap