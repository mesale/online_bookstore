import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes/AppRouter";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
<<<<<<< HEAD

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
=======
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
  </React.StrictMode>
);