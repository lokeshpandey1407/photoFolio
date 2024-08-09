import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import Signup from "./Components/Auth/Signup";
import Signin from "./Components/Auth/Signin";
import App from "./App";
import AlbumsList from "./Components/AlbumsList/AlbumsList";
import ImagesList from "./Components/ImagesList/ImagesList";
import Image from "./Components/Image/Image";
import ProtectedRoute from "./config/ProtectedRoute";

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
        element: (
          <ProtectedRoute>
            <AlbumsList />
          </ProtectedRoute>
        ),
      },
      {
        path: "albums/:id",
        element: (
          <ProtectedRoute>
            <ImagesList />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "images",
            element: (
              <ProtectedRoute>
                <Image />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  { path: "*", element: <p>Error 404 not found</p> },
]);

export default router;
