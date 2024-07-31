import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { Toaster } from 'react-hot-toast';
import { SocketContextProvider } from "./context/SocketContext.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <SocketContextProvider>
          <App />
        <Toaster />
      </SocketContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
