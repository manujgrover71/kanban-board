import React from "react";
import { CssBaseline, Paper, Typography } from "@mui/material";
import Title from "./Title";
import Card from "../../Card";
import InputContainer from "../input/InputContainer";
import { Droppable } from "react-beautiful-dnd";
function List({ list }) {
  return (
    <div>
      <Paper
        style={{
          backgroundColor: "#EBECF0",
          width: "300px",
          marginLeft: "16px",
          marginTop: "16px",
        }}
      >
        <CssBaseline />
        <Title title={list.title} listId={list.id} />
        <Droppable droppableId={list.id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {list.cards
                ? list.cards.map((card, idx) => (
                    <Card key={card.id} card={card} listId={list.id} index={idx} />
                  ))
                : ""}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
          <InputContainer listId={list.id} type="card" />
      </Paper>
    </div>
  );
}

export default List;
