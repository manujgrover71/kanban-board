import React, { useContext, useState } from "react";
import { AppBar, Button, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import styled from "@mui/styled-engine";
import { Link } from "react-router-dom";
import { StoreAPI } from "../../utils/storeAPI";

function Navbar() {
  
  const { user } = useContext(StoreAPI);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogOut = () => {
    localStorage.removeItem('JWT_TOKEN');
  }
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "lightgreen",
        minHeight: "47px",
        justifyContent: "center",
      }}
    >
      <Wrapper>
        {user && (
          <>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              onClick={handleMenu}
              aria-haspopup="true"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
          </>
        )}
        {!user && (
          <Link to="/login">
            <Button style={{ color: "white", backgroundColor: "green" }}>
              Login
            </Button>
          </Link>
        )}
      </Wrapper>
    </AppBar>
  );
}

export default Navbar;

const Wrapper = styled("div")`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 0.5%;
`;
