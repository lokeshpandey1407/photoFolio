import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../logo.png";

//Navbar component
const Navbar = ({ handleCloseAlbum }) => {
  return (
    <div className={styles.navbar}>
      <img className={styles.logoImg} src={logo} alt="logo" />
      <h3
        tabIndex={0}
        onClick={handleCloseAlbum}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCloseAlbum();
          }
        }}
      >
        PhotoFolio
      </h3>
    </div>
  );
};

export default Navbar;
