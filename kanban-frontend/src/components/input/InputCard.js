import React, { useState, useContext } from "react";
import { Button, IconButton, InputBase, Paper } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import styled from "@mui/styled-engine";
import { StoreAPI } from "../../utils/storeAPI";

function InputCard({ setOpen, listId, type }) {
  const [title, setTitle] = useState("");
  const { addCard, addList } = useContext(StoreAPI);

  function handleChange(e) {
    setTitle(e.target.value);
  }

  function handleBtnConfirm() {
    if(title === "")
      return;
    
    if (type === "card") {
      addCard(title, listId);
      setOpen(false);
      setTitle("");
    } else {
      setOpen(false);
      setTitle("");
      addList(title);
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
          <ClearIcon style={{ color: 'white' }} />
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
  background-color: #212121;
  :hover {
    background: #313133;
  }
`;

export default InputCard;
