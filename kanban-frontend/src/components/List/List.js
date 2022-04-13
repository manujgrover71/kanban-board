import React from "react";
import { CssBaseline, Paper } from "@mui/material";
import Title from "./Title";
import Card from "../../Card";
import InputContainer from "../input/InputContainer";
import { Droppable } from "react-beautiful-dnd";
function List({ list }) {
  return (
    <div>
      <Paper
        style={{
          backgroundColor: "#383838",
          width: "300px",
          marginLeft: "16px",
          marginTop: "16px",
        }}
      >
        <CssBaseline />
        <Title title={list.title} listId={list._id} />
        <Droppable droppableId={list._id} key={list._id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {list.cards
                ? list.cards.map((card, idx) => (
                    <Card key={card._id} card={card} listId={list._id} index={idx} />
                  ))
                : ""}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
          <InputContainer listId={list._id} type="card" />
      </Paper>
    </div>
  );
}

export default List;
