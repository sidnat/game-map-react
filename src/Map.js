import { Box } from "@mui/system";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const Map = props => {
	const [map, setMap] = useState(null)
	const [pins, setPins] = useState(null)
	let { id } = useParams();

	useEffect(() => {
		axios.get(`http://localhost:3003/getMapAndPins?uuid=${id}`)
			.then((results) => {
				console.log('results', results)
				setMap(results.map)
				setPins(results.pins)
			})
	}, [])


	//3 usestates
	{/* load hardcoded uuid c94cbfd0-ccc9-40d7-a1c9-57b6390efb93 from backend and show the image, mapName, Creator on screen*/ }

	return (
		<Box>
			<h5>{JSON.stringify(map)}</h5>
			{/* <TextField>{creator}</TextField>
            <TextField>{mapName}</TextField> */}
			{/* <img src={imageLink} /> */}
		</Box>
	)
}

export default Map;