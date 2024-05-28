import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../logo.png";

//Navbar component
const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <img className={styles.logoImg} src={logo} alt="logo" />
      <h3>PhotoFolio</h3>
    </div>
  );
};

export default Navbar;
