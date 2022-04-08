import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthAPI } from "./authAPI";

function RequiredAuth({ children }) {
  const { user } = useContext(AuthAPI);
  
  if(user) {
    return children;
  }
  
  return <Navigate to="/login" />
}

export default RequiredAuth;
