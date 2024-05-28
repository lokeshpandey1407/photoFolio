import React from "react";
import styles from "./Album.module.css";

//Album Component to show and style one Album component
const Album = ({ album, handleOpenAlbum }) => {
  return (
    <div
      tabIndex={0}
      className={styles.album}
      onClick={() => handleOpenAlbum(album)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          handleOpenAlbum(album);
        }
      }}
    >
      <img className={styles.img} src="./assets/gallery.png" alt="Album" />
      <p className={styles.albumName}>{album.albumTitle}</p>
    </div>
  );
};

export default Album;
