import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { API } from "../../config/utils";
import { useToast } from "../../config/ToastContext";
import api from "../../config/Axios.config";
import { useDispatch } from "react-redux";
import { signin } from "../../Redux/authReducer";

const Signin = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { notify } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!userData.email) newErrors.email = "Email is required";
    if (!userData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validate()) {
      setIsLoading(false);
      return;
    }
    api
      .post(API.signin, userData)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        if (data?.success) {
          dispatch(signin());
          navigate("/albums");
          localStorage.setItem("auth_token", JSON.stringify(data.token));
          notify(data?.message || "Success", "success");
        } else {
          notify(data?.message || "Server Error. Please try again", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Box
      sx={{ backgroundColor: "white" }}
      p={5}
      mt={10}
      width={500}
      borderRadius={5}
    >
      <Typography variant="h4" mb={6} textAlign={"center"}>
        Sign In
      </Typography>
      <form>
        <Stack direction={"column"} gap={4}>
          <TextField
            error={Boolean(errors.email)}
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            id="email"
            required
            onChange={handleChange}
            helperText={errors.email}
          />
          <TextField
            error={Boolean(errors.password)}
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            id="password"
            name="password"
            required
            onChange={handleChange}
            helperText={errors.password}
          />
          <Button
            variant="outlined"
            sx={{
              width: "fit-content",
              alignSelf: "center",
              textTransform: "none",
            }}
            type="submit"
            onClick={handleSignin}
          >
            {isLoading ? <CircularProgress size={30} /> : "Sign In"}
          </Button>
        </Stack>
      </form>
      <Typography mt={4} textAlign={"center"}>
        Don't have an account? <Link to={"/signup"}>Click here</Link> to Sign
        up.
      </Typography>
    </Box>
  );
};

export default Signin;
