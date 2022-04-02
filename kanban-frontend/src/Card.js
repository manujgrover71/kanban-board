import React, { useContext, useState } from "react";
import { IconButton, Paper } from "@mui/material";
import styled from "@mui/styled-engine";
import { Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import { StoreAPI } from "./utils/storeAPI";

function Card({ card, index, listId }) {
  const [open, setOpen] = useState(false);
  const { deleteCard } = useContext(StoreAPI);
  
  function handleDelete() {
    deleteCard(card._id, listId);
  }
  
  return (
    <Draggable draggableId={card._id} index={index} >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <PaperWrapper
            onMouseOver={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            {card.title}
            {open ? (
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            ) : (
              ""
            )}
          </PaperWrapper>
        </div>
      )}
    </Draggable>
  );
}

const PaperWrapper = styled(Paper)`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px;
`;
export default Card;
