import { Collapse, Paper, Typography } from "@mui/material";
import React from "react";
import styled from "@mui/styled-engine";
import InputCard from "./InputCard";
import { useState } from "react";

function InputContainer({ listId, type }) {
  const [open, setOpen] = useState(false);
  return (
    <Wrapper>
      <Collapse in={open}>
        <InputCard setOpen={setOpen} listId={listId} type={type} />
      </Collapse>
      <Collapse in={!open}>
        <PaperWrapper
          elevation={0}
          onClick={() => setOpen(!open)}
        >
          <Typography>
            {type === "card" ? "+ Add a Card" : "+ Add another list"}
          </Typography>
        </PaperWrapper>
      </Collapse>
    </Wrapper>
  );
}

const Wrapper = styled("div")`
  width: 300px;
  margin-top: 8px;
`;

const PaperWrapper = styled(Paper)`
  padding: 8px 8px 8px 8px;
  margin: 8px;
  background: #ebecf0;
  :hover {
    background-color: rgb(0, 0, 0, 0.25);
    color: white;
  }
`;

export default InputContainer;
