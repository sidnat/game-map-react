import { Box } from "@mui/system";


const Map = props => {
    //3 usestates
    //useeffect with empty dependency array to make the call to get map data from express server and show data in return
{/* load hardcoded uuid c94cbfd0-ccc9-40d7-a1c9-57b6390efb93 from backend and show the image, mapName, Creator on screen*/}

    return (
        <Box>
            <TextField>{mapName}</TextField>
            <TextField>{mapName}</TextField>
            <img src={imageLink} />
        </Box>
        )
}

export default Map;