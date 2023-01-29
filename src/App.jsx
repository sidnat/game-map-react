import AddMap from "./components/AddMap"
import Map from "./components/Map";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import "leaflet/dist/leaflet.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AddMap />,
  },
  {
    path: "/:uuid",
    element: <Map />
  }
]);

const App = (props) => {
  return (
    <RouterProvider router={router} />
  )
}

export default App