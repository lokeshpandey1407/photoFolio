import React, { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { TbArrowBackUp } from "react-icons/tb";
import Image from "../Image/Image";
import ImageSlider from "../ImageSlider/ImageSlider";
import { CiSearch } from "react-icons/ci";
import { BiImageAdd } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import api from "../../config/Axios.config";
import { API } from "../../config/utils";
import { useToast } from "../../config/ToastContext";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLoading,
  handleUploadLoading,
  imageSelector,
  setAlbum,
  setImages,
  addImage,
  deleteImage,
  handleDeleteLoading,
} from "../../Redux/imageReducer";
import { Delete, Close, Info } from "@mui/icons-material";
import Dropzone from "react-dropzone";

//Images component where all the images are rendered inside an Album
const ImagesList = () => {
  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState("");
  const [files, setFiles] = useState([]);
  const [cols, setCols] = useState(4);
  const [searchText, setSearchText] = useState("");
  const [imageSliderOverlay, setImageSliderOverlay] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filteredImages, setFilteredImages] = useState([]);
  const { id } = useParams();
  const {
    images,
    albumName,
    isImagesLoading,
    isImagesUploading,
    isImageDeleting,
  } = useSelector(imageSelector);
  const { notify } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //screen size for responsive behaviour
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  //modal open function
  const handleClickOpen = () => {
    setOpen(true);
  };

  //modal close function
  const handleClose = () => {
    setOpen(false);
    setFiles([]);
  };

  //delete modal close function
  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  //delete modal close function
  const handleDeleteModalClose = () => {
    setSelectedImageId("")
    setDeleteModalOpen(false);
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

  //Function to get album pictures from database
  const getAllImages = async () => {
    if (!id) {
      navigate("/albums");
    }
    dispatch(handleLoading(true));
    api
      .get(API.getAllImages, { params: { albumId: id } })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        if (data.success) {
          dispatch(setImages(data?.data?.images || []));
          dispatch(setAlbum(data?.data?.albumName || "Images"));
        } else {
          notify(data?.message || "Server Error. Please try again", "error");
        }
      })
      .catch((err) => {
        console.log(err);
        notify(err || "Server Error. Please try again", "error");
      })
      .finally(() => {
        dispatch(handleLoading(false));
      });
  };

  //Function to upload images to the album
  const handleUploadImages = async () => {
    dispatch(handleUploadLoading(true));

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(file.name, file);
    });
    formData.append("albumId", id);

    api
      .post(API.uploadImages, formData)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        if (data.success) {
          dispatch(addImage(data?.data || []));
          console.log(data);
          notify(data?.message || "Success", "success");
          handleClose();
        } else {
          notify(data?.message || "Server Error. Please try again", "error");
        }
      })
      .catch((err) => {
        console.log(err);
        notify(
          err?.response?.data?.message || "Server Error. Please try again",
          "error"
        );
      })
      .finally(() => {
        dispatch(handleUploadLoading(false));
      });
  };

  //Function to delete the image from the list
  const handleDeleteImageFromList = async (index) => {
    setFiles((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleDeleteImage = async () => {
    const id = selectedImageId;
    dispatch(handleDeleteLoading(true));
    if (!id) {
      notify("Image id is not valid", "error");
    }
    api
      .delete(API.deleteImage, { params: { imageId: id } })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        if (data.success) {
          dispatch(deleteImage(data?.data || {}));
          notify(data?.message || "Success", "success");
        } else {
          notify(data?.message || "Server Error. Please try again", "error");
        }
      })
      .catch((err) => {
        console.log(err);
        notify(err || "Server Error. Please try again", "error");
      })
      .finally(() => {
        dispatch(handleDeleteLoading(false));
        handleDeleteModalClose();
      });
  };

  //useEffect function to get the pictures on first render
  useEffect(() => {
    // handleGetPictures();
    getAllImages();
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

  useEffect(() => {
    if (isXs) {
      setCols(1);
    } else if (isSm) {
      setCols(2);
    } else if (isMd) {
      setCols(3);
    } else {
      setCols(4);
    }
  }, [isXs, isMd, isSm]);

  return (
    <Box width={"100%"} mt={8} marginInline={2}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        pb={2}
        position={"static"}
      >
        <Backdrop
          open={isImageDeleting || isImagesUploading}
          sx={{ zIndex: 100 }}
        />
        <Tooltip title="Go back">
          <IconButton
            aria-label="back"
            onClick={() => {
              navigate("/albums");
            }}
          >
            <TbArrowBackUp />
          </IconButton>
        </Tooltip>
        <Typography variant="h6" fontWeight={"bold"}>
          {isImagesLoading ? "Images" : albumName}
        </Typography>
        <Tooltip title="Upload images">
          <Button variant="outlined" onClick={handleClickOpen}>
            Upload
          </Button>
        </Tooltip>
      </Stack>
      <Divider />

      {/* Image upload modal */}
      <Dialog open={open} fullWidth onClose={handleClose}>
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: "rgb(76, 76, 115)" }}
          color={"#fff"}
        >
          Upload images
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent dividers>
          <Stack gap={2}>
            <Dropzone
              onDrop={(acceptedFiles) => {
                setFiles(acceptedFiles);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <Box>
                  <Box
                    {...getRootProps()}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={"100px"}
                    borderRadius={2}
                    p={2}
                    border={"1px solid #E0E0E0"}
                    sx={{ cursor: "pointer" }}
                  >
                    <TextField {...getInputProps()} />
                    <Typography>
                      Drag 'n' drop some files here, or click to upload
                    </Typography>
                  </Box>
                </Box>
              )}
            </Dropzone>
            <Typography variant="caption">
              {files.length} {files.length > 1 ? "files" : "file"} Selcted
            </Typography>
            <Divider />
            <Stack maxHeight={"220px"} overflow={"auto"} gap={2}>
              {files && files.length > 0 ? (
                files.map((file, index) => (
                  <Paper
                    key={file.name}
                    elevation={0}
                    sx={{
                      border: "1px solid #E0E0E0",
                      padding: "5px 10px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">{file.name}</Typography>{" "}
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          handleDeleteImageFromList(index);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Paper>
                ))
              ) : (
                <Typography variant="caption">No files here</Typography>
              )}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "rgb(76, 76, 115)" }}>
          <Button
            variant="contained"
            color="success"
            disabled={isImagesLoading}
            onClick={() => {
              //  handleClose();
              handleUploadImages();
            }}
          >
            {isImagesUploading ? (
              <CircularProgress size={25} sx={{ color: "#fff" }} />
            ) : (
              "Upload"
            )}
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={isImagesLoading}
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* delete image modal */}
      <Dialog
                    open={deleteModalOpen}
                    fullWidth
                    onClose={handleDeleteModalClose}
                  >
                    <DialogTitle
                      sx={{ m: 0, p: 2, backgroundColor: "rgb(76, 76, 115)" }}
                      color={"#fff"}
                    >
                      Delete Image
                    </DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={handleDeleteModalClose}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      <Close />
                    </IconButton>
                    <DialogContent dividers>
                      <Typography variant="body">
                        Are you sure you want to delete the image ? Image cannot
                        be recovered after deletion.
                      </Typography>
                    </DialogContent>
                    <DialogActions sx={{ backgroundColor: "rgb(76, 76, 115)" }}>
                      <Button
                        variant="contained"
                        color="success"
                        disabled={isImageDeleting}
                        onClick={handleDeleteImage}
                      >
                        {isImageDeleting ? (
                          <CircularProgress size={25} sx={{ color: "#fff" }} />
                        ) : (
                          "Delete"
                        )}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        disabled={isImageDeleting}
                        onClick={() => {
                          handleDeleteModalClose();
                        }}
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>

      {isImagesLoading ? (
        <Box justifyContent={"center"} mt={10} textAlign={"center"}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid mt={2}>
          {images && images.length > 0 ? (
            <ImageList
              sx={{ width: "100%", maxHeight: "70dvh" }}
              cols={cols}
              gap={8}
            >
              {images.map((image) => (
                <ImageListItem key={image._id}>
                  <Tooltip>
                    <IconButton
                      onClick={() => {
                        handleDeleteModalOpen();
                        setSelectedImageId(image._id);
                      }}
                      sx={{
                        position: "absolute",
                        backgroundColor: "#393939",
                        top: "5px",
                        right: "5px",
                      }}
                    >
                      <Delete sx={{ fontSize: "18px", color: "orangered" }} />
                    </IconButton>
                  </Tooltip>
                  <img
                    srcSet={`${image.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${image.imageUrl}?w=248&fit=crop&auto=format`}
                    alt={image.imageName}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={image.imageName}
                    sx={{
                      ".MuiImageListItemBar-title": {
                        fontSize: "12px",
                      },
                    }}
                    position="below"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <Typography textAlign={"center"} mt={10}>
              <Button variant="text" onClick={handleClickOpen}>
                Click here
              </Button>
              to add image to your album.
            </Typography>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default ImagesList;
