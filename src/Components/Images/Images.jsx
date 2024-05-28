import React, { useEffect, useRef, useState } from "react";
import styles from "./Images.module.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import DB from "../../firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbArrowBackUp } from "react-icons/tb";
import Image from "../Image/Image";
import ImageSlider from "../ImageSlider/ImageSlider";
import { CiSearch } from "react-icons/ci";
import { BiImageAdd } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

//Images component where all the images are rendered inside an Album
const Images = ({ currentAlbum, handleCloseAlbum }) => {
  const [addImageModel, setAddImageModel] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [openSearchInput, setOpenSearchInput] = useState(false);
  const [imageToBeUpdated, setImageToBeUpdated] = useState({});
  const [imageSliderOverlay, setImageSliderOverlay] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [editImage, setEditImage] = useState(false);
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [imageTitle, setImageTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const searchInputRef = useRef();

  //Toggle function for displaying and hiding the Add Image model
  const handleToggleAddImageContainer = () => {
    setEditImage(false);
    setAddImageModel((prev) => {
      if (prev) {
        clearTextInput();
        return false;
      } else {
        return true;
      }
    });
  };

  //Function to open the Image slider for images
  const openImageSliderOverlay = () => {
    setImageSliderOverlay(true);
  };

  //Function to close the Image slider for images
  const closeImageSliderOverlay = () => {
    setImageSliderOverlay(false);
  };

  //Function to move to next image when clicking on the next button in image slider
  const handleNextImage = () => {
    if (currentImageIndex === filteredImages.length - 1) {
      setCurrentImageIndex(0);
    } else setCurrentImageIndex((prev) => prev + 1);
  };

  //Function to move to previous image when clicking on the previous button in image slider
  const handlePreviousImage = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(filteredImages.length - 1);
    } else setCurrentImageIndex((prev) => prev - 1);
  };

  //Function to clear the text input
  const clearTextInput = () => {
    setImageTitle("");
    setImageUrl("");
  };

  //Function to get album pictures from firestore
  const handleGetPictures = async () => {
    const unsub = onSnapshot(
      collection(DB, `photofolio/${currentAlbum.id}/pictures`),
      (snapshot) => {
        const images = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setImages(images);
        setFilteredImages(images);
      }
    );
    return unsub;
  };

  //Function to add or to update the picture to firstore
  const handleAddUpdateImage = async () => {
    //if check for empty image title
    if (!imageTitle || imageTitle.trim() === "") {
      toast.error("Image title cannot be empty", {
        position: "top-center",
      });
      return;
    }
    //if check for empty image url
    if (!imageUrl || imageUrl.trim() === "") {
      toast.error("Image Url cannot be empty", {
        position: "top-center",
      });
      return;
    }
    //Checking if you are editing an image
    if (editImage) {
      const pictureRef = doc(
        DB,
        `photofolio/${currentAlbum.id}/pictures`,
        imageToBeUpdated.id
      );
      await updateDoc(pictureRef, {
        imageTitle: imageTitle,
        imageUrl: imageUrl,
      });
      setImageToBeUpdated({});
      toast.success("Image updated successfully", {
        position: "top-right",
      });
      setAddImageModel(false);
    }
    //if it is not editing then add the image to firestore
    else {
      await addDoc(collection(DB, `photofolio/${currentAlbum.id}/pictures`), {
        imageTitle: imageTitle,
        imageUrl: imageUrl,
      });
      toast.success("Image added successfully", {
        position: "top-right",
      });
    }
    clearTextInput();
  };

  //Function to open the edit image model and setting the image title and image url into input
  const handleEditImage = async (image) => {
    setEditImage(true);
    setAddImageModel(true);
    setImageTitle(image.imageTitle);
    setImageUrl(image.imageUrl);
    setImageToBeUpdated(image);
  };

  //Function to delete the image
  const handleDeleteImage = async (image) => {
    await deleteDoc(
      doc(DB, `photofolio/${currentAlbum.id}/pictures`, image.id)
    );
    toast.success("Image deleted successfully", { position: "top-right" });
  };

  //useEffect function to get the pictures on first render
  useEffect(() => {
    handleGetPictures();
  }, []);

  // useEffect function to get the filtered images when you enter something the search text
  useEffect(() => {
    if (searchText === "") {
      setFilteredImages(images);
      return;
    }
    const newImages = images.filter((image) =>
      image.imageTitle.toLowerCase().includes(searchText)
    );
    setFilteredImages(newImages);
  }, [searchText]);

  return (
    <div className={styles.imageContainer}>
      {addImageModel && (
        <div className={styles.addImageContainer}>
          <h3>{editImage ? "Update Image" : "Add New Image"}</h3>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Enter your Image title"
              value={imageTitle}
              onChange={(e) => {
                setImageTitle(e.target.value);
              }}
              autoFocus
            />
            <input
              type="text"
              placeholder="Enter your Image Url"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
            />
            <div className={styles.actions}>
              <button className={styles.btnClear} onClick={clearTextInput}>
                Clear
              </button>
              <button
                className={styles.btnCreate}
                onClick={handleAddUpdateImage}
              >
                {editImage ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.header}>
        <div className={styles.heading}>
          <button
            className={styles.backBtn}
            onClick={handleCloseAlbum}
            title="Back"
          >
            <TbArrowBackUp />
          </button>

          <h2>{currentAlbum.albumTitle}</h2>
        </div>

        <div className={styles.searchContainer}>
          <input
            className={`${styles.searchInput} ${
              openSearchInput && styles.open
            }`}
            type="text"
            ref={searchInputRef}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            className={`${styles.btn} ${styles.searchBtn}`}
            title="Search"
            onClick={() => {
              if (openSearchInput) {
                setOpenSearchInput(false);
                setSearchText("");
              } else {
                setOpenSearchInput(true);
                searchInputRef.current.focus();
              }
            }}
          >
            <CiSearch />
          </button>
          <button
            className={styles.btn}
            onClick={handleToggleAddImageContainer}
            title={addImageModel ? "Cancel" : "Add New Image"}
          >
            {addImageModel ? <IoMdClose /> : <BiImageAdd fontSize={"large"} />}
          </button>
        </div>
      </div>
      {images.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>No images in the album</h3>
      ) : (
        <div className={styles.imagesSection}>
          {filteredImages.map((image, index) => {
            return (
              <React.Fragment key={index}>
                <Image
                  image={image}
                  index={index}
                  handleEditImage={handleEditImage}
                  handleDeleteImage={handleDeleteImage}
                  openImageSliderOverlay={openImageSliderOverlay}
                  setCurrentImageIndex={setCurrentImageIndex}
                />
              </React.Fragment>
            );
          })}
        </div>
      )}
      <ToastContainer />
      {imageSliderOverlay && (
        <ImageSlider
          images={filteredImages}
          currentImageIndex={currentImageIndex}
          closeImageSliderOverlay={closeImageSliderOverlay}
          handleNextImage={handleNextImage}
          handlePreviousImage={handlePreviousImage}
        />
      )}
    </div>
  );
};

export default Images;
