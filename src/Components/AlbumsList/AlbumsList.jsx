import React, { useEffect, useState } from "react";
import Album from "../Album/Album";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "../../config/ToastContext";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { API } from "../../config/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  albumSelector,
  createAlbum,
  setAlbums,
} from "../../Redux/albumReducer";
import api from "../../config/Axios.config";

//PhotoAlbums component to render all the albums
const AlbumsList = () => {
  const [open, setOpen] = useState(false);
  const [albumTitle, setAlbumTitle] = useState("");
  const [errors, setErrors] = useState({ albumTitle: "" });
  const { albums } = useSelector(albumSelector);
  const { notify } = useToast();
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Function to clear text input
  const clearTextInput = () => {
    setAlbumTitle("");
  };

  const validate = () => {
    const newErrors = {};
    if (!albumTitle || albumTitle === "") {
      newErrors.albumTitle = "Album Name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Function to add new Album into firebase
  const handleAddAlbum = async (e) => {
    if (!validate()) {
      return;
    }

    api
      .post(API.createAlbum, { name: albumTitle })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        if (data.success) {
          console.log(data);
          notify(data?.message || "Success", "success");
          dispatch(createAlbum(data?.data || {}));
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
        clearTextInput();
        handleClose();
      });
  };

  const getAllAlbums = async () => {
    api
      .get(API.getAllAlbums)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        if (data.success) {
          dispatch(setAlbums(data?.data || []));
        } else {
          notify(data?.message || "Server Error. Please try again", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllAlbums();
  }, []);

  return (
    <Box width={"100%"} mt={8}  marginInline={2}>
      <Stack direction={"row"} justifyContent={"space-between"} pb={2}>
        <Typography variant="h6" fontWeight={"bold"}>
          Your Albums
        </Typography>
        <Tooltip title="Create Album">
          <Button variant="outlined" onClick={handleClickOpen}>
            Create
          </Button>
        </Tooltip>
      </Stack>
      <Divider />

      <Dialog open={open} fullWidth onClose={handleClose}>
        <DialogTitle>Create New Album</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            error={Boolean(errors.albumTitle)}
            required
            margin="dense"
            id="name"
            name="albumName"
            label="Album Name"
            type="text"
            fullWidth
            variant="standard"
            value={albumTitle}
            helperText={errors.albumTitle}
            onChange={(e) => {
              setAlbumTitle(e.target.value);
              setErrors({ albumTitle: "" });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              handleClose();
              clearTextInput();
              setErrors({ albumTitle: "" });
            }}
          >
            Cancel
          </Button>
          <Button variant="outlined" color="success" onClick={handleAddAlbum}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={6} mt={2} justifyContent={"center"}>
        {albums && albums.length > 0 ? (
          albums.map((album) => {
            return (
              <Grid item key={album._id}>
                <Album
                  album={album}
                  // handleOpenAlbum={handleOpenAlbum}
                />
              </Grid>
            );
          })
        ) : (
          <Typography textAlign={"center"} mt={10}>
            <Button variant="text" onClick={handleClickOpen}>
              Click here
            </Button>
            to create a new album and start uploading.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default AlbumsList;
