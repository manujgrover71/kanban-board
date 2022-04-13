import React, { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import axios from "axios";

const initialState = {
  user: null,
  token_id: null,
  loading: true,
  error: "",
};

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
const AuthAPI = createContext(initialState);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("JWT_TOKEN"));

    if (saved) {
      const expireTime = parseJwt(saved?.token_id);
      if (expireTime && expireTime.exp * 1000 < Date.now()) {
        signOut();
      } else {
        dispatch({
          type: "SET_USER",
          payload: { user_id: saved.user_id, token_id: saved.token_id },
        });
      }
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
        "/api/v1/users/login",
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
        dispatch({ type: "FETCH_ERROR", payload: err.response.data.message });
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
        "/api/v1/users/register",
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
        dispatch({ type: "FETCH_ERROR", payload: err.response.data.message });
    }
  }

  async function signOut() {
    localStorage.removeItem("JWT_TOKEN");
    dispatch({ type: "SIGNOUT_USER" });
  }

  return (
    <AuthAPI.Provider
      value={{
        user: state.user,
        token_id: state.token_id,
        loading: state.loading,
        error: state.error,
        loginUser,
        registerUser,
        signOut,
      }}
    >
      {children}
    </AuthAPI.Provider>
  );
};

export { AuthAPI, AuthProvider };
