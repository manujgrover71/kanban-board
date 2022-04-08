import React, { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import axios from "axios";

const initialState = {
  user: null,
  token_id: null,
  loading: true,
};

const AuthAPI = createContext(initialState);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("JWT_TOKEN"));

    if (saved) {
      dispatch({
        type: "SET_USER",
        payload: { user_id: saved.user_id, token_id: saved.token_id },
      });
    }
    
  }, []);

  async function loginUser(email, password) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = {
        email,
        password,
      };

      const res = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        data,
        config
      );

      localStorage.setItem(
        "JWT_TOKEN",
        JSON.stringify({ user_id: res.data._id, token_id: res.data.token_id })
      );
      
      dispatch({
        type: "SET_USER",
        payload: { user_id: res.data._id, token_id: res.data.token_id },
      });
      
    } catch (err) {
      //! TODO: Update error!
    //   dispatch({ type: "FETCH_ERROR", payload: err.response.data.error });
    }
  }

  async function registerUser(name, email, password) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = {
        name,
        email,
        password,
      };

      const res = await axios.post(
        "http://localhost:5000/api/v1/users/register",
        data,
        config
      );

      localStorage.setItem(
        "JWT_TOKEN",
        JSON.stringify({ user_id: res.data._id, token_id: res.data.token_id })
      );
      dispatch({
        type: "SET_USER",
        payload: { user_id: res.data._id, token_id: res.data.token_id },
      });
    } catch (err) {
      //! TODO: Update error!
    //   dispatch({ type: "FETCH_ERROR", payload: err.response.data.error });
    }
  }
  
  async function signOut() {
    localStorage.removeItem('JWT_TOKEN');
    dispatch({ type: "SIGNOUT_USER" });
  }

  return (
    <AuthAPI.Provider
      value={{
        user: state.user,
        token_id: state.token_id,
        loading: state.loading,
        loginUser,
        registerUser,
        signOut
      }}
    >
      {children}
    </AuthAPI.Provider>
  );
};

export { AuthAPI, AuthProvider };