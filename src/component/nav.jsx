import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Divider from "@mui/material/Divider";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Icon from "@mui/material/Icon";
import PersonIcon from "@mui/icons-material/Person";
import Shoppingcart from "./shoppingcart.jsx";

export default function nav() {
  const quantityCartA = useSelector(
    (state) => state.cart.shoppingCart.quantity
  );
  const [quantityCart, setQuantityCart] = useState(0);

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
          <ListItem key={item.title}>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              {item.title}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const cartDrawer = () => <Shoppingcart toggleDrawer={toggleDrawer} />;
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
              sx={{ mr: 2 }}
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
            sx={{ mx: 2 }}
          >
            Shopping
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Button
              component={Link}
              to="/shoppingCart"
              color="inherit"
              sx={{ mx: 2 }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/shoppingCart/cart"
              sx={{ mx: 2 }}
            >
              Cart
            </Button>

            <Button color="inherit" sx={{ mx: 2 }}>
              About
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton size="large" color="inherit">
            <PersonIcon />
          </IconButton>
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
