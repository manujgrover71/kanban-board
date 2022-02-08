import { InputBase, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import styled from "@mui/styled-engine";
import { makeStyles } from "@mui/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
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
  const { updateListTitle } = useContext(storeAPI);
  const [newTitle, setNewTitle] = useState(title);
  function handleOnChange(e) {
    setNewTitle(e.target.value);
  }

  function handleOnBlur() {
    updateListTitle(newTitle, listId);
    setOpen(false);
  }

  return (
    <div>
      {open ? (
        <div>
          <InputBase
            autoFocus
            onChange={handleOnChange}
            value={newTitle}
            inputProps={{
              className: classes.input,
            }}
            fullWidth
            onBlur={handleOnBlur}
          />
        </div>
      ) : (
        <IdleTitelWrapper>
          <IdleTitle onClick={() => setOpen(!open)}>
            {title}
          </IdleTitle>
          <MoreHorizIcon />
        </IdleTitelWrapper>
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

const IdleTitelWrapper = styled('div')`
  display: flex;
  margin-left: 8px;
`

export default Title;
