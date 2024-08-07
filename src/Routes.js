import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import Signup from "./Components/Auth/Signup";
import Signin from "./Components/Auth/Signin";
import App from "./App";
import AlbumsList from "./Components/AlbumsList/AlbumsList";
import ImagesList from "./Components/ImagesList/ImagesList";
import Image from "./Components/Image/Image";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "albums",
        element: <AlbumsList />,
      },
      {
        path: "albums/:id",
        element: <ImagesList />,
        children: [
          {
            path: "images",
            element: <Image />,
          },
        ],
      },
    ],
  },
  { path: "*", element: <p>Error 404 not found</p> },
]);

export default router;
