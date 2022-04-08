import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StoreProvider } from "./utils/storeAPI";
import { AuthProvider } from "./utils/authAPI";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
