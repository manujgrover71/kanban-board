import "./App.css";
import List from "./components/List/List";
import React, { useContext, useEffect } from "react";
import { StoreAPI } from "./utils/storeAPI";
import styled from "@mui/styled-engine";
import InputContainer from "./components/input/InputContainer";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const { data, getData, updateCardPosition } = useContext(StoreAPI);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const cardTitle = data
      .filter((list) => list._id === result.source.droppableId)[0]
      .cards.filter((card) => card._id === result.draggableId)[0]["title"];

    const details = {
      destination: result.destination,
      source: result.source,
      draggableId: result.draggableId,
      cardTitle,
    };

    updateCardPosition(details);
  };

  return (
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
