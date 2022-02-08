import { IconButton, InputBase, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import styled from "@mui/styled-engine";
import { makeStyles } from "@mui/styles";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import storeAPI from "../../utils/storeAPI";

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
  const { updateListTitle, dropList } = useContext(storeAPI);
  const [newTitle, setNewTitle] = useState(title);
  function handleOnChange(e) {
    setNewTitle(e.target.value);
  }

  function handleOnBlur() {
    updateListTitle(newTitle, listId);
    setOpen(false);
  }
  
  function handleListDelete() {
    console.log("Delete List");
    dropList(listId);
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
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 8px;
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
