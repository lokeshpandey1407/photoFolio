import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import AlbumsList from "./Components/AlbumsList/AlbumsList";
import ImagesList from "./Components/ImagesList/ImagesList";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  //States for albums and current Album
  const [albums, setAlbums] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState({ id: "", albumTitle: "" });

  //Get all albums handler function
  const handleGetAlbums = async () => {};

  //Function to open the album by setting the current album
  const handleOpenAlbum = (album) => {
    setCurrentAlbum(album);
  };

  //Function to close the album by setting the current album as empty
  const handleCloseAlbum = () => {
    setCurrentAlbum({ id: "", albumTitle: "" });
  };

  //useEffect function to get all the albums at the first render
  useEffect(() => {
    handleGetAlbums();
  }, []);

  return (
    <div>
      <Navbar handleCloseAlbum={handleCloseAlbum} />
      <main
        style={{
          maxWidth: "1100px",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* {currentAlbum.id ? (
          <ImagesList
            currentAlbum={currentAlbum}
            handleCloseAlbum={handleCloseAlbum}
          />
        ) : (
          <AlbumsList
            albums={albums}
            handleOpenAlbum={handleOpenAlbum}
            handleCloseAlbum={handleCloseAlbum}
          />
        )} */}
        <Outlet />
        <ToastContainer />
      </main>
    </div>
  );
}

export default App;
