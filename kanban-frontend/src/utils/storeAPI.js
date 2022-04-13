import React, { createContext, useContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import { AuthAPI } from "./authAPI";

let initialState = {
  data: [],
  error: null,
  isLoading: true,
};

const StoreAPI = createContext(initialState);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const { token_id } = useContext(AuthAPI);

  async function getData() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token_id}`,
        },
      };

      const res = await axios.get("/api/v1/", config);

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
          Authorization: `Bearer ${token_id}`,
        },
      };

      const data = {
        text: title,
        listId,
        position,
      };

      const res = await axios.post(
        "/api/v1/card",
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
          Authorization: `Bearer ${token_id}`,
        },
      };

      const data = {
        title: title,
        user_id: state.user,
      };

      const res = await axios.post(
        "/api/v1/list",
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
          Authorization: `Bearer ${token_id}`,
        },
      };

      const data = {
        title: title,
      };

      await axios.put(
        `/api/v1/list/${listId}`,
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
          Authorization: `Bearer ${token_id}`,
        },
      };

      await axios.delete(`/api/v1/list/${listId}`, config);

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
          Authorization: `Bearer ${token_id}`,
        },
        data: {
          cardId: cardId,
          listId: listId,
        },
      };

      await axios.delete("/api/v1/card", config);

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
          Authorization: `Bearer ${token_id}`,
        },
        data: {
          cardId: draggableId,
          listId: source.droppableId,
        },
      };

      await axios.delete("/api/v1/card", config);

      const config1 = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token_id}`,
        },
      };

      const data = {
        text: cardTitle,
        listId: destination.droppableId,
        position: destination.index,
      };

      const res = await axios.post(
        "/api/v1/card",
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
        getData,
        addCard,
        addList,
        updateListTitle,
        deleteList,
        deleteCard,
        updateCardPosition,
      }}
    >
      {children}
    </StoreAPI.Provider>
  );
};

export { StoreAPI, StoreProvider };
