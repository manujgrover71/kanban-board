import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

let initialState = {
  data: [],
  user: null,
  token_id: null,
  error: null,
  isLoading: true,
};

const StoreAPI = createContext(initialState);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function setUser(token_id, user_id) {
    dispatch({
      type: "SET_USER",
      payload: { user_id, token_id },
    });
  }

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
      dispatch({ type: "FETCH_ERROR", payload: err.response.data.error });
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
      dispatch({ type: "FETCH_ERROR", payload: err.response.data.error });
    }
  }

  async function getData() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.token_id}`,
        },
      };

      const res = await axios.get("http://localhost:5000/api/v1/", config);

      dispatch({ type: "GET_DATA", payload: res.data.data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.response.data.error });
    }
  }

  async function addCard(title, listId, position) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.token_id}`,
        },
      };

      const data = {
        text: title,
        listId,
        position,
      };

      const res = await axios.post(
        "http://localhost:5000/api/v1/card",
        data,
        config
      );

      const card = {
        title: data["text"],
        _id: res.data.data.id,
      };

      dispatch({ type: "ADD_CARD", payload: card, listId: listId });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.response.data.error });
    }
  }

  async function addList(title) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.token_id}`,
        },
      };

      const data = {
        title: title,
        user_id: state.user,
      };

      const res = await axios.post(
        "http://localhost:5000/api/v1/list",
        data,
        config
      );

      const list = {
        title: data["title"],
        _id: res.data.data[0]["_id"],
        cards: [],
      };

      dispatch({ type: "ADD_LIST", payload: list });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.response.data.error });
    }
  }

  async function updateListTitle(listId, title) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.token_id}`,
        },
      };

      const data = {
        title: title,
      };

      await axios.put(
        `http://localhost:5000/api/v1/list/${listId}`,
        data,
        config
      );

      data["id"] = listId;
      dispatch({ type: "UPDATE_LIST_TITLE", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.response.data.error });
    }
  }

  async function deleteList(listId) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.token_id}`,
        },
      };

      await axios.delete(`http://localhost:5000/api/v1/list/${listId}`, config);

      dispatch({ type: "DELETE_LIST", payload: listId });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.response.data.error });
    }
  }

  async function deleteCard(cardId, listId) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.token_id}`,
        },
        data: {
          cardId: cardId,
          listId: listId,
        },
      };

      await axios.delete("http://localho  st:5000/api/v1/card", config);

      dispatch({ type: "DELETE_CARD", payload: { cardId, listId } });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.response.data.error });
    }
  }

  async function updateCardPosition({
    destination,
    source,
    draggableId,
    cardTitle,
  }) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.token_id}`,
        },
        data: {
          cardId: draggableId,
          listId: source.droppableId,
        },
      };

      await axios.delete("http://localhost:5000/api/v1/card", config);

      const config1 = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.token_id}`,
        },
      };

      const data = {
        text: cardTitle,
        listId: destination.droppableId,
        position: destination.index,
      };

      const res = await axios.post(
        "http://localhost:5000/api/v1/card",
        data,
        config1
      );

      const card = {
        title: cardTitle,
        _id: res.data.data.id,
      };

      const details = {
        sourceListId: source.droppableId,
        destinationListId: destination.droppableId,
        card: card,
        cardId: draggableId,
        cardPosition: destination.index,
      };

      dispatch({ type: "DRAG_AND_DROP", payload: details });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.response.data.error });
    }
  }

  return (
    <StoreAPI.Provider
      value={{
        data: state.data,
        error: state.error,
        loading: state.loading,
        user: state.user,
        token_id: state.token_id,
        loginUser,
        registerUser,
        getData,
        addCard,
        addList,
        updateListTitle,
        deleteList,
        deleteCard,
        updateCardPosition,
        setUser
      }}
    >
      {children}
    </StoreAPI.Provider>
  );
};

export { StoreAPI, StoreProvider };
