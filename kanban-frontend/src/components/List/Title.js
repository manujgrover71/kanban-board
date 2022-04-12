import { IconButton, InputBase } from "@mui/material";
import React, { useState, useContext } from "react";
import styled from "@mui/styled-engine";
import { makeStyles } from "@mui/styles";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { StoreAPI } from "../../utils/storeAPI";

const useStyle = makeStyles(() => ({
  input: {
    margin: "8px",
    "&:focus": {
      backgroundColor: "#ddd",
    },
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
}));

function Title({ title, listId }) {
  const [open, setOpen] = useState(false);
  const classes = useStyle();
  const { updateListTitle, deleteList } = useContext(StoreAPI);
  const [newTitle, setNewTitle] = useState(title);
  function handleOnChange(e) {
    setNewTitle(e.target.value);
  }

  function handleOnBlur() {
    
    if(newTitle === "") {
      setNewTitle("List");
      return;
    }
    
    updateListTitle(listId, newTitle);
    setOpen(false);
  }
  
  function handleListDelete() {
    deleteList(listId);
  }

  return (
    <div>
      {open ? (
        <InputBaseWrapper>
          <InputBase
            autoFocus
            onChange={handleOnChange}
            value={newTitle}
            inputProps={{
              className: classes.input,
            }}
            onBlur={handleOnBlur}
          />
          <IconButton onMouseDown={handleListDelete}>
            <HighlightOffIcon />
          </IconButton>
        </InputBaseWrapper>
      ) : (
        <IdleTitleWrapper>
          <IdleTitle onClick={() => setOpen(!open)}>
            {title}
          </IdleTitle>
        </IdleTitleWrapper>
      )}
    </div>
  );
}

const IdleTitle = styled("div")`
  flex-grow: 1;
  font-size: 1.0rem;
  color: #dcdcdc;
  font-family: 'Heebo';
  font-weight: bold;
  margin-top: 8px;
  margin-left: 3px;
`;

const InputBaseWrapper = styled('div')`
  display: flex;
`;

const IdleTitleWrapper = styled('div')`
  display: flex;
  align-items: center;
  margin-left: 8px;
`

export default Title;
