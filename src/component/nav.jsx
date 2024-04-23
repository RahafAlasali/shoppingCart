import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink, Link } from "react-router-dom";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Shoppingcart from "./shoppingcart.jsx";
import { setLogin } from "../store/auth/index";
import Typography from "@mui/material/Typography";

export default function nav() {
  const quantityCartA = useSelector(
    (state) => state.cart.shoppingCart.quantity
  );
  const [quantityCart, setQuantityCart] = useState(0);
  var isLogin = useSelector((state) => {
    return state.auth.isLogin;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setQuantityCart(JSON.parse(localStorage.getItem("quantityCart")));
  }, [quantityCartA]);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  let listNav = [
    { title: "Home", link: "/shoppingCart" },
    { title: "Cart", link: "/shoppingCart/cart" },
    { title: "Dashboard", link: "/shoppingCart/dashboard" },
    { title: "About", link: "/shoppingCart" },
  ];
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <List sx={{ my: 3 }}>
        {listNav.map((item) => (
          <>
            <ListItem key={item.title}>
              <ListItemButton
                component={Link}
                to={item.link}
                sx={{ justifyContent: "center" }}
              >
                <Typography fontSize="x-large" fontWeight="600">
                  {item.title}
                </Typography>
              </ListItemButton>
            </ListItem>
            <Divider width="70%" sx={{ mx: "auto !important" }} />
          </>
        ))}
      </List>
    </Box>
  );
  const cartDrawer = () => <Shoppingcart toggleDrawer={toggleDrawer} />;
  function logout() {
    localStorage.removeItem("token");
    dispatch(setLogin(false));
  }
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: { md: 2, xs: 0 } }}
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
              onOpen={toggleDrawer("left", true)}
            >
              {list()}
            </SwipeableDrawer>
          </>
          <Button
            component={Link}
            to="/shoppingCart"
            color="inherit"
            sx={{
              fontSize: { md: "larger", xs: "small" },
              ":hover": { backgroundColor: "transparent" },
            }}
          >
            Store
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { sm: "block", xs: "none" } }}>
            <Button
              component={NavLink}
              to="/shoppingCart"
              color="inherit"
              sx={{ mx: 2, ":hover": { backgroundColor: "transparent" } }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to="/shoppingCart/cart"
              sx={{ mx: 2, ":hover": { backgroundColor: "transparent" } }}
            >
              Cart
            </Button>
            <Button
              color="inherit"
              sx={{ mx: 2, ":hover": { backgroundColor: "transparent" } }}
            >
              About
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {!isLogin && (
            <Button
              color="inherit"
              component={Link}
              to="/shoppingCart/login"
              sx={{
                mx: 2,
                fontSize: { sm: "larger", xs: "small" },
                ":hover": { backgroundColor: "transparent" },
              }}
            >
              Login
            </Button>
          )}
          {isLogin && (
            <Button
              color="inherit"
              component={Link}
              sx={{
                mx: 2,
                fontSize: { sm: "larger", xs: "small" },
                ":hover": { backgroundColor: "transparent" },
                ":focus": { backgroundColor: "transparent" },
              }}
              onClick={() => logout()}
            >
              logout
            </Button>
          )}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={toggleDrawer("right", true)}
            >
              <Badge badgeContent={quantityCart} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <SwipeableDrawer
              anchor={"right"}
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
              onOpen={toggleDrawer("right", true)}
            >
              {cartDrawer()}
            </SwipeableDrawer>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
