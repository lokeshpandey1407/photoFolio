import React, { useState } from "react";
import styles from "./AlbumsList.module.css";
import Album from "../Album/Album";
import { addDoc, collection } from "firebase/firestore";
import DB from "../../firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//PhotoAlbums component to render all the albums
const AlbumsList = ({ albums, handleOpenAlbum }) => {
  const [addAlbumModel, setAddAlbumModel] = useState(false);
  const [albumTitle, setAlbumTitle] = useState("");

  //Function to toggle add Ablum model
  const handleToggleAddAlbumContainer = () => {
    setAddAlbumModel((prev) => {
      if (prev) {
        clearTextInput();
        return false;
      } else {
        return true;
      }
    });
  };

  //Function to clear text input
  const clearTextInput = () => {
    setAlbumTitle("");
  };

  //Function to add new Album into firebase
  const handleAddAlbum = async () => {
    if (!albumTitle || albumTitle.trim() === "") {
      toast.error("Album Name cannot be empty", {
        position: "top-center",
      });
      return;
    }
    await addDoc(collection(DB, "photofolio"), {
      albumTitle: albumTitle,
    });
    clearTextInput();
    toast.success("Album created successfully", {
      position: "top-right",
    });
    setAddAlbumModel(false);
  };

  return (
    <div className={styles.albumContainer}>
      {addAlbumModel && (
        <div className={styles.addAlbumContainer}>
          <h3>Create an Album</h3>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Enter your Album Name"
              value={albumTitle}
              onChange={(e) => {
                setAlbumTitle(e.target.value);
              }}
              autoFocus
            />
            <div className={styles.actions}>
              <button className={styles.btnClear} onClick={clearTextInput}>
                Clear
              </button>
              <button className={styles.btnCreate} onClick={handleAddAlbum}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.header}>
        <h2>Your Albums</h2>
        <button
          className={styles.btn}
          onClick={handleToggleAddAlbumContainer}
          title="Create New Album"
        >
          {addAlbumModel ? "Cancel" : "Add Album"}
        </button>
      </div>
      <div className={styles.albumsSection}>
        {albums.map((album) => {
          return (
            <Album
              key={album.id}
              album={album}
              handleOpenAlbum={handleOpenAlbum}
            />
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AlbumsList;
