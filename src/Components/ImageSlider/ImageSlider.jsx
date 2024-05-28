import React, { useEffect, useRef, useState } from "react";
import styles from "./ImageSlider.module.css";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { IoClose } from "react-icons/io5";

const ImageSlider = ({
  images,
  currentImageIndex,
  closeImageSliderOverlay,
  handleNextImage,
  handlePreviousImage,
}) => {
  const [currentImage, setCurrentImage] = useState({});

  //useEffect function to setCurrentImage when clicking next or previous button in image slider
  useEffect(() => {
    setCurrentImage(images[currentImageIndex]);
  }, [currentImageIndex, images]);

  return (
    <div className={styles.imageSliderContainer}>
      <div className={styles.imageSliderWrapper}>
        <button
          className={`${styles.btn} ${styles.prevBtn}`}
          onClick={handlePreviousImage}
          title="Previous"
        >
          <GrFormPrevious />
        </button>
        <div className={styles.imageSlider}>
          <img src={currentImage.imageUrl} alt={currentImage.imageTitle} />
        </div>
        <button
          className={`${styles.btn} ${styles.nextBtn}`}
          onClick={handleNextImage}
          title="Next"
        >
          <GrFormNext />
        </button>
        <button
          className={`${styles.btn} ${styles.closeBtn}`}
          onClick={closeImageSliderOverlay}
          title="Close"
        >
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
