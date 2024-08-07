import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import { ToastProvider } from "./config/ToastContext";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./Theme";
import { Provider } from "react-redux";
import store from "./Redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  </>
);
