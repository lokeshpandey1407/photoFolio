import React from "react";
import styles from "./Album.module.css";
import gallery from "../../gallery.png";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
//Album Component to show and style one Album component
const Album = ({ album }) => {
  const navigate = useNavigate();

  const handleOpenAlbum = (id) => {
    navigate(`/albums/${id}`);
  };

  return (
    <Box
      tabIndex={0}
      className={styles.album}
      onClick={() => handleOpenAlbum(album?._id || "")}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          handleOpenAlbum(album?._id || "");
        }
      }}
    >
      <img className={styles.img} src={gallery} alt="Album" />
      <Typography fontWeight={"bold"} className={styles.albumName}>
        {album.name}
      </Typography>
    </Box>
  );
};

export default Album;
