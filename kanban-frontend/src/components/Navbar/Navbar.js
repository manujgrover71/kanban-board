import React, { useContext, useState } from "react";
import { AppBar, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import styled from "@mui/styled-engine";
import { AuthAPI } from "../../utils/authAPI";

function Navbar() {
  
  const { user, signOut } = useContext(AuthAPI);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogOut = () => {
    signOut();
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
        backgroundColor: "#383838",
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
              <AccountCircle style={{ color: 'white'}} />
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
