import React from "react";
import styles from "./Image.module.css";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

//Image component to show and style one image component
const Image = ({
  image,
  index,
  handleEditImage,
  handleDeleteImage,
  openImageSliderOverlay,
  setCurrentImageIndex,
}) => {
  return (
    <div
      className={styles.imgContainer}
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        setCurrentImageIndex(index);
        openImageSliderOverlay();
      }}
      //Function to open the image by clicking enter when the focus is on the image
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.stopPropagation();
          setCurrentImageIndex(index);
          openImageSliderOverlay();
        }
      }}
    >
      <img src={image.imageUrl} alt={image.imageTitle} />
      <h5>{image.imageTitle}</h5>
      <button
        tabIndex={-1}
        className={`${styles.btn} ${styles.editBtn}`}
        title="Edit"
        onClick={(e) => {
          e.stopPropagation();
          handleEditImage(image);
        }}
      >
        <MdOutlineEdit />
      </button>
      <button
        tabIndex={-1}
        className={`${styles.btn} ${styles.deleteBtn}`}
        title="Delete"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteImage(image);
        }}
      >
        <MdDeleteOutline />
      </button>
    </div>
  );
};

export default Image;
