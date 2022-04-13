import React, { useContext, useEffect, useRef } from "react";
import styled from "@mui/styled-engine";
import { Alert, Button, Paper, TextField } from "@mui/material";
import { AuthAPI } from "../utils/authAPI";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const email = useRef();
  const password = useRef();
  let navigate = useNavigate();
  const { user, loginUser, error } = useContext(AuthAPI);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email.current.value, password.current.value);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <LoginWrapper elevation={1}>
          <TitleWrapper>LOGIN</TitleWrapper>
          <br />
          {error && error.length > 0 && <Alert severity="error">{error}</Alert>}
          <TextField
            color="success"
            label="Email"
            variant="standard"
            inputRef={email}
          />
          <br />
          <TextField
            label="Password"
            variant="standard"
            type="password"
            inputRef={password}
          />
          <br />
          <Button
            style={{ backgroundColor: "#383838", color: "white" }}
            type="submit"
          >
            Login
          </Button>
          <br />
          <LinkWrapper>
            <Link to="/register">New user? Register HERE</Link>
          </LinkWrapper>
        </LoginWrapper>
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
  background-color: #212121;
`;

const LoginWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 20px 30px 30px 30px;
  justify-content: space-between;
  width: 300px;
  min-height: 220px;
`;

const LinkWrapper = styled("div")`
  display: flex;
  justify-content: center;
`;

const TitleWrapper = styled('span')`
  font-size: 20px;
  font-weight: bold;
  font-family: 'Heebo';
`;

export default Login;
