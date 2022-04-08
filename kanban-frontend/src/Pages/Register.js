import React, { useContext, useEffect, useRef } from "react";
import styled from "@mui/styled-engine";
import { Button, Paper, TextField } from "@mui/material";
import { StoreAPI } from "../utils/storeAPI";
import { useNavigate } from "react-router-dom";

function Register() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { user, registerUser } = useContext(StoreAPI);

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(
      name.current.value,
      email.current.value,
      password.current.value
    );
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <RegisterWrapper elevation={1}>
          REGISTER
          <TextField label="Name" variant="standard" inputRef={name} />
          <TextField label="Email" variant="standard" inputRef={email} />
          <TextField
            label="Password"
            variant="standard"
            type="password"
            inputRef={password}
          />
          <Button type="submit">Register</Button>
        </RegisterWrapper>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled("div")`
  display: flex;
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: green;
`;

const RegisterWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 20px 30px 30px 30px;
  justify-content: space-between;
  width: 300px;
  min-height: 300px;
`;

export default Register;
