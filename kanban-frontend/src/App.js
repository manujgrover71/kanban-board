import "./App.css";
import { v4 as uuid } from "uuid";
import List from "./components/List/List";
import React, { useEffect, useState } from "react";
import StoreApi from "./utils/storeAPI";
import styled from "@mui/styled-engine";
import InputContainer from "./components/input/InputContainer";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:5000/data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postRequest = (details) => {
    fetch("http://localhost:5000/data", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((response) => {
        if (response.ok) {
          console.log(`${details.type} Exectued!`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Returned Data is ", data);
        fetchData();
      })
      .catch((error) => {
        console.log(`Error while ${details.type} `, error);
      });
  };

  const deleteCard = (card, listId) => {
    console.log("This is card: ", card);

    const details = {
      cardId: card._id,
      listId,
      type: "deleteCard",
    };

    fetch("http://localhost:5000/data", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        fetchData();
        console.log("Returned Data is ", data);
      })
      .catch((error) => {
        console.log(`Error while ${details.type} `, error);
      });
  };

  const addMoreCard = (title, listId) => {
    console.log("From app.js: ");
    console.log("Adding new Card :", title, listId);

    const details = {
      id: uuid(),
      title: title,
      listId: listId,
      type: "addTitle",
    };

    postRequest(details);
  };

  const addMoreList = (title) => {
    let details = {
      id: uuid(),
      title,
      cards: [],
      type: "addList",
    };

    postRequest(details);
  };

  const updateListTitle = (title, listId) => {
    const details = {
      listId,
      listTitle: title,
      type: "updateList",
    };

    postRequest(details);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const cardTitle = data
      .filter((list) => list._id === result.source.droppableId)[0]
      .cards.filter((card) => card._id === result.draggableId)[0]["title"];
    console.log(cardTitle);

    const details = {
      type: "onDragEnd",
      destination: result.destination,
      source: result.source,
      draggableId: result.draggableId,
      cardTitle,
    };

    postRequest(details);
  };

  const dropList = (listId) => {
    const details = {
      listId,
      type: "dropList",
    };

    fetch("http://localhost:5000/data", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        fetchData();
        console.log("Returned Data is ", data);
      })
      .catch((error) => {
        console.log(`Error while ${details.type} `, error);
      });
  };

  return (
    <StoreApi.Provider
      value={{ addMoreCard, addMoreList, updateListTitle, deleteCard, dropList }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          {data
            ? Object.entries(data).map((list) => {
                return <List list={list[1]} key={list[1].id} />;
              })
            : ""}
          <InputContainer type="list" />
        </Wrapper>
      </DragDropContext>
    </StoreApi.Provider>
  );
}

const Wrapper = styled("div")`
  display: flex;
  min-height: 100vh;
  background: green;
  width: 100%;
  overflow-y: auto;
`;

export default App;
