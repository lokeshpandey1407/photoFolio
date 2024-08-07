import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../config/utils";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import api from "../../config/Axios.config";
import { useToast } from "../../config/ToastContext";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { notify } = useToast();
  const navigate = useNavigate();

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify(userData),
    };

    api
      .post(API.signup, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          navigate("/");
          console.log(data);
          notify(data?.message || "Success", "success");
        } else {
          notify(data?.message || "Server Error. Please try again", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box
      sx={{ backgroundColor: "white" }}
      p={5}
      mt={8}
      width={500}
      borderRadius={5}
    >
      <Typography variant="h4" mb={6} textAlign={"center"}>
        Create Account
      </Typography>
      <form>
        <Stack direction={"column"} gap={4}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            type="text"
            id="name"
            name="name"
            required
            value={userData.name}
            onChange={handleDataChange}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            id="email"
            name="email"
            required
            value={userData.email}
            onChange={handleDataChange}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            id="password"
            name="password"
            required
            value={userData.password}
            onChange={handleDataChange}
          />
          <Button
            variant="outlined"
            sx={{
              width: "fit-content",
              alignSelf: "center",
              textTransform: "none",
            }}
            type="submit"
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </Stack>
      </form>
      <Typography mt={4} textAlign={"center"}>
        Already have an account? <Link to={"/"}>Click here</Link> to Sign
      </Typography>
    </Box>
  );
};

export default Signup;
