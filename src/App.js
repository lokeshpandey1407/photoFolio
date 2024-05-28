import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import PhotoAlbums from "./Components/PhotoAlbums/PhotoAlbums";
import { collection, onSnapshot } from "firebase/firestore";
import DB from "./firebaseConfig";
import Images from "./Components/Images/Images";

function App() {
  //States for albums and current Album
  const [albums, setAlbums] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState({ id: "", albumTitle: "" });

  //Get all albums handler function
  const handleGetAlbums = async () => {
    const unsub = onSnapshot(collection(DB, "photofolio"), (snapshot) => {
      const albums = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setAlbums(albums);
    });
    return unsub;
  };

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
      <Navbar />
      <main
        style={{
          maxWidth: "1100px",
          margin: "auto",
        }}
      >
        {currentAlbum.id ? (
          <Images
            currentAlbum={currentAlbum}
            handleCloseAlbum={handleCloseAlbum}
          />
        ) : (
          <PhotoAlbums
            albums={albums}
            handleOpenAlbum={handleOpenAlbum}
            handleCloseAlbum={handleCloseAlbum}
          />
        )}
      </main>
    </div>
  );
}

export default App;
