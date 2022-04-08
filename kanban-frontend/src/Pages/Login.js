import React, { useContext, useEffect, useRef } from "react";
import styled from "@mui/styled-engine";
import { Button, Paper, TextField } from "@mui/material";
import { AuthAPI } from '../utils/authAPI';
import { useNavigate } from "react-router-dom";

function Login() {
  
  const email = useRef();
  const password = useRef();
  let navigate = useNavigate();
  const { user, loginUser } = useContext(AuthAPI);
  
  useEffect(() => {
    
    if(user) {
      navigate('/');
    }
    
  }, [user]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email.current.value, password.current.value);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <LoginWrapper elevation={1}>
          LOGIN
          <TextField label="Email" variant="standard" inputRef={email}/>
          <TextField label="Password" variant="standard" type="password" inputRef={password} />
          <Button type="submit">Login</Button>
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
  background-color: green;
`;

const LoginWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 20px 30px 30px 30px;
  justify-content: space-between;
  width: 300px;
  min-height: 200px;
`;

export default Login;
