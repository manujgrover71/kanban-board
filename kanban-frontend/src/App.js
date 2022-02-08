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
      .catch((error) =>  {
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
        console.log("Returned Data is ", data);
        fetchData();
      })
      .catch((error) => {
        console.log(`Error while ${details.type} `, error);
      });
      
  };
  
  const deleteCard = (card, listId) => {
    console.log(card, listId);
    
    const details = {
      cardId: card.id,
      listId
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
      
  }

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
      list: {
        id: uuid(),
        title,
        cards: [],
      },
      type: "addList",
    };

    postRequest(details);
  };

  const updateListTitle = (title, listId) => {
    const list = data.lists[listId];
    list.title = title;
    
    const details = {
      list,
      type: 'updateList'
    }

    postRequest(details);
  };

  function onDragEnd(result) {
    if (!result.destination) return;

    const details = {
      type: 'onDragEnd',
      destination: result.destination,
      source: result.source,
      draggableId: result.draggableId
    };
    
    postRequest(details);
  }

  return (
    <StoreApi.Provider value={{ addMoreCard, addMoreList, updateListTitle, deleteCard }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          {data
            ? data.listIds.map((listId) => {
                const list = data.lists[listId];
                return <List list={list} key={listId} />;
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
