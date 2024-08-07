// ToastContext.js
import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const notify = (message, type = "info") => {
    toast[type](message, { autoClose: 3000 });
  };

  return (
    <ToastContext.Provider value={{ notify }}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
