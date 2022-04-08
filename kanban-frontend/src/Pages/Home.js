import React, { useContext, useEffect } from "react";
import List from "../components/List/List";
import { StoreAPI } from "../utils/storeAPI";
import styled from "@mui/styled-engine";
import InputContainer from "../components/input/InputContainer";
import Navbar from "../components/Navbar/Navbar";
import { DragDropContext } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { data, user, getData, updateCardPosition, setUser } = useContext(StoreAPI);

  useEffect(() => {
    
    if(!user) {
      navigate('/login');
    }
    
    getData();
    // eslint-disable-next-line
  }, [user]); 

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const cardTitle = data
      .filter((list) => list._id === result.source.droppableId)[0]
      .cards.filter((card) => card._id === result.draggableId)[0]["title"];

    const details = {
      destination: result.destination,
      source: result.source,
      draggableId: result.draggableId,
      cardTitle
    };

    updateCardPosition(details);
  };

  return (
    <>
      <Navbar />
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
    </>
  );
}

const Wrapper = styled("div")`
  display: flex;
  min-height: calc((100vh) - 47px);
  background: green;
  width: 100%;
  overflow-y: auto;
`;

export default Home;
