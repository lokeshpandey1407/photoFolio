import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
  palette: {
    custom: {
      white: "#fff",
      black: "#393939",
      lightBlue: "#e3f2fd",
      darkBlue: "#0d47a1",
      customGreen: "#4caf50",
      customRed: "#f44336",
    },
  },
});

export default theme;
