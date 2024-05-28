import React from "react";
import styles from "./Navbar.module.css";

//Navbar component
const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <img className={styles.logoImg} src="/assets/logo.png" alt="logo" />
      <h3>PhotoFolio</h3>
    </div>
  );
};

export default Navbar;
