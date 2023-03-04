import { useState } from 'react';
import axios from '../utils/axios';
import { AppBar, Paper, Box, Grid, TextField, Button, Card, CardContent, Typography } from '@mui/material';
import './AddMap.css'
import landingImage from '../assets/landingImage.png'
import { v4 as uuidv4 } from 'uuid'

const AddMap = (props) => {
  const [mapName, setMapName] = useState("");
  const [creator, setCreator] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("media", selectedFile);
    formData.append("key", "0000334f0bdb447fc1efc3a8efa304f7")

    return axios.post("https://thumbsnap.com/api/upload", formData)
  }

  const handleSave = () => {
    const map = {
      id: uuidv4(),
      mapName,
      creator,
    }

    console.log(map)

    onFileUpload()
      .then((res) => {

        console.log('resdata', res.data)
        console.log('resurl', res.data.url)

        axios.post("addMap", {
          ...map,
          imageLink: res.data.image.url
        })
        // bookmark page prompt
      })
      .catch((err) => alert("Failed") && console.log(err));
  }

  return (
    <div>
      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button onClick={(e) => handleSave()}>
        Upload!
      </button>
    </div>
  );

  // return (
  //   <>
  //     <AppBar position="static">
  //       <Typography className="navbar" variant="h3" component="div" sx={{ flexGrow: 1 }}>
  //         GameMap
  //       </Typography>
  //     </AppBar>
  //     <div className="landing">
  //       <div>
  //         <Box
  //           component="form"
  //           noValidate
  //           autoComplete="off"
  //           className="appBox"
  //         >
  //           <Paper elevation={3} >
  //             <Grid>
  //               <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
  //                 <Typography gutterBottom variant="h5" align="center">
  //                   Add your own High-res map image, and place pins wherever you want!
  //                 </Typography>
  //                 <CardContent>
  //                   <Typography gutterBottom variant="h6" align="center">
  //                     Create your map by submitting the following:
  //                   </Typography>
  //                   {/* <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
  //                   Fill up the form and our team will get back to you within 24 hours.
  //                 </Typography> */}
  //                   <form>
  //                     <Grid container spacing={2}>
  //                       <Grid xs={12} item>
  //                         <TextField
  //                           id="outlined-basic"
  //                           placeholder="example: GTA V, RDR2, Hogwarts Legacy..."
  //                           label="Map Title"
  //                           variant="outlined"
  //                           fullWidth required
  //                           onChange={(e) => setMapName(e.target.value)}
  //                         />
  //                       </Grid>
  //                       <Grid xs={12} item>
  //                         <TextField
  //                           id="outlined-basic"
  //                           label="Creator"
  //                           placeholder="example: FirstName LastName"
  //                           variant="outlined"
  //                           fullWidth required
  //                           onChange={(e) => setCreator(e.target.value)}
  //                         />
  //                       </Grid>
  //                       <Grid item xs={12}>
  //                         <Button
  //                           variant="contained"
  //                           component="label"
  //                         >
  //                           Upload Map Image
  //                           <input
  //                             accept="image/*"
  //                             type="file"
  //                             onChange={(e) => setSelectedFile(e.target.files[0])}
  //                             hidden
  //                           />
  //                         </Button>
  //                       </Grid>
  //                       <Grid xs={12} item>
  //                         <TextField
  //                           id="outlined-read-only-input"
  //                           value={selectedFile?.name}
  //                           placeholder="ExampleFileName.jpeg"
  //                           variant="outlined"
  //                           fullWidth required
  //                           InputProps={{
  //                             readOnly: true,
  //                           }}
  //                         />
  //                       </Grid>
  //                       <Grid item xs={12}>
  //                         <Button
  //                           type="submit"
  //                           variant="contained"
  //                           color="primary"
  //                           fullWidth
  //                           onClick={() => {
  //                             console.log(selectedFile)
  //                             if (mapName && creator && selectedFile) {
  //                               handleSave()
  //                             } else {
  //                               alert('Map details not saved')
  //                             }
  //                           }}
  //                         >Create Map</Button>
  //                       </Grid>

  //                     </Grid>
  //                   </form>
  //                 </CardContent>
  //               </Card>
  //             </Grid>
  //           </Paper>
  //         </Box>
  //       </div>
  //       <div>
  //         <img src={landingImage} width="497em" alt="GTA V Pin map example" />
  //       </div>
  //     </div>
  //   </>
  // );
}

export default AddMap;
