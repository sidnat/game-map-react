import AddMap from "./AddMap"
import Map from "./Map";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AddMap />,
  },
  {
    path: "/map/:id",
    element: <Map />
  }
]);

const App = (props) => {
  return (
    <RouterProvider router={router} />
  )
}

export default App