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
  const cartDrawer = () => (
    <>
      <Box minWidth={250} p={4}>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography gutterBottom variant="h6">
              <Box pb={2}>Shopping Cart</Box>
            </Typography>
            <Icon onClick={toggleDrawer("right", false)}>
              <CloseIcon />
            </Icon>
          </Box>
          <Divider />
          <Box
            py={4}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/imgs/product-1.png"}
                height={75}
                width={75}
              ></img>
              <Typography paddingX={1}>Title</Typography>
            </Box>
            <Icon>
              <CancelOutlinedIcon />
            </Icon>
          </Box>
          <Divider />
          <Box py={2} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Subtotal</Typography>
            <Typography> 1000</Typography>
          </Box>
          <Divider />
        </Box>
        <Box>
          <Box>
            <Button
              variant="contained"
              size="large"
              sx={{ padding: 1, paddingX: 1, marginTop: 2, minWidth: 250 }}
              component={Link}
              to="/shoppingCart/cart"
              onClick={toggleDrawer("right", false)}
            >
              View Cart
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              size="large"
              sx={{ padding: 1, paddingX: 1, marginTop: 2, minWidth: 250 }}
              component={Link}
            >
              checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </>
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
