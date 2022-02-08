import React from "react";
import { CssBaseline, Paper, Typography } from "@mui/material";
import Title from "./Title";
import Card from "../../Card";
import InputContainer from "../input/InputContainer";
import { Droppable } from "react-beautiful-dnd";
function List({ list, key }) {
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
        <Title title={list.title} listId={list._id} />
        <Droppable droppableId={list._id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {list.cards
                ? list.cards.map((card, idx) => (
                    <Card key={card.id} card={card} listId={list._id} index={idx} />
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
