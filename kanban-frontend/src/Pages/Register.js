import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "@mui/styled-engine";
import { Button, Alert, Paper, TextField } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { AuthAPI } from "../utils/authAPI";

function Register() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { user, registerUser, error } = useContext(AuthAPI);

  const [emailHT, setEmailHT] = useState("");
  const [passHT, setPassHT] = useState("");

  useEffect(() => {
    if (user) navigate("/");
    // eslint-disable-next-line
  }, [user]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email.current.value)) {
      setEmailHT("Please Enter Valid Email");
      return;
    }
    setEmailHT("");

    if (password.current.value.length < 6) {
      setPassHT("Password should be atleast 6 digits");
      return;
    }
    setPassHT("");

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
          <TitleWrapper>REGISTER</TitleWrapper>
          {error && error.length > 0 && <Alert severity="error">{error}</Alert>}
          <br />
          <TextField label="Name" variant="standard" inputRef={name} />
          <br />
          <TextField
            label="Email"
            helperText={emailHT}
            variant="standard"
            inputRef={email}
          />
          <br />
          <TextField
            label="Password"
            variant="standard"
            type="password"
            helperText={passHT}
            inputRef={password}
          />
          <br />
          <Button
            style={{ backgroundColor: "#383838", color: "white" }}
            type="submit"
          >
            Register
          </Button>
          <br />
          <LinkWrapper>
            <Link to="/login">Already have an account?</Link>
          </LinkWrapper>
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
  background-color: #212121;
`;

const RegisterWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 20px 30px 30px 30px;
  justify-content: space-between;
  width: 300px;
  min-height: 300px;
`;

const LinkWrapper = styled("div")`
  display: flex;
  justify-content: center;
`;

const TitleWrapper = styled("span")`
  font-size: 20px;
  font-weight: bold;
  font-family: "Heebo";
`;

export default Register;
