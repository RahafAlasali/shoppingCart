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

export default function nav() {
  const quantityCartA = useSelector(
    (state) => state.quantity.shoppingCart.quantity
  );
  const [quantityCart, setQuantityCart] = useState(0);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  useEffect(() => {
    setQuantityCart(JSON.parse(localStorage.getItem("quantityCart")));
  }, [quantityCartA]);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, ["left"]: open });
  };
  let listNav = [
    { title: "Home", link: "/" },
    { title: "Cart", link: "/cart" },
    { title: "Dashboard", link: "/dashboard" },
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
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Shopping
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Button component={Link} to="/" color="inherit" sx={{ mx: 2 }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/cart" sx={{ mx: 2 }}>
              Cart
            </Button>
            <Button color="inherit" sx={{ mx: 2 }}>
              About
            </Button>
            <Button color="inherit" sx={{ mx: 2 }}>
              About
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              color="inherit"
              component={Link}
              to="/cart"
            >
              <Badge badgeContent={quantityCart} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
