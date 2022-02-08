import React, { useState, useContext } from "react";
import { Button, IconButton, InputBase, Paper } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import styled from "@mui/styled-engine";
import storeAPI from "../../utils/storeAPI";

function InputCard({ setOpen, listId, type }) {
  const [title, setTitle] = useState("");
  const { addMoreCard, addMoreList } = useContext(storeAPI);

  function handleChange(e) {
    setTitle(e.target.value);
  }

  function handleBtnConfirm() {
    if (type == "card") {
      addMoreCard(title, listId);
      setOpen(false);
      setTitle("");
    } else {
      setOpen(false);
      setTitle("");
      addMoreList(title);
    }
  }

  return (
    <div>
      <div>
        <PaperWrapper>
          <InputBase
            onChange={handleChange}
            multiline
            fullWidth
            autoFocus
            onBlur={() => setOpen(false)}
            value={title}
            placeholder={
              type === "card"
                ? "Enter the title of card..."
                : "Enter list title"
            }
          />
        </PaperWrapper>
      </div>
      <div style={{ margin: '8px' }}>
        <BtnWrapper onClick={handleBtnConfirm}>
          {type === "card" ? "Add Card" : "Add List"}
        </BtnWrapper>
        <IconButton onClick={() => setOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
}

const PaperWrapper = styled(Paper)`
  padding: 8px 8px 16px 8px;
  margin: 8px;
  width: 280px;
`;

const BtnWrapper = styled(Button)`
  background: #5aac44;
  color: white;
  :hover {
    background: rgb(90, 172, 68, 0.75);
  }
`;

export default InputCard;