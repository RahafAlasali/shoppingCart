import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Divider from "@mui/material/Divider";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { store } from "../store";
import { removeItemToCart } from "../store/cart";

export default function shoppingcart({ toggleDrawer }) {
  const btnStyle = {
    color: "#425068",
    background: "#FFF",
    border: "2px solid",
    "&:hover": {
      backgroundColor: "#4e6378 !important",
      color: "#FFF",
    },
  };
  const shoppingCarts = useSelector((state) => {
    return state.cart.shoppingCarts;
  });
  const total = useSelector((state) => {
    return state.cart.total;
  });
  const quantityCart = useSelector((state) => state.cart.shoppingCart.quantity);
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  function removeFromCart(id) {
    dispatch(removeItemToCart(id));
  }
  useEffect(() => {
    localStorage.setItem("shoppingCarts", JSON.stringify(shoppingCarts));
    localStorage.setItem("quantityCart", JSON.stringify(quantityCart));
  }, [shoppingCarts]);

  return (
    <>
      <Box minWidth={250} p={4}>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography gutterBottom variant="h6" fontWeight="bold">
              <Box pb={2}>Shopping Cart</Box>
            </Typography>
            <Icon
              onClick={toggleDrawer("right", false)}
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <CloseIcon />
            </Icon>
          </Box>
          <Divider />
          {shoppingCarts.map((item) => {
            return (
              <Box
                py={2}
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
                  {products.map((itemP) => {
                    return itemP.id == item.id ? (
                      <>
                        <img src={itemP.image} height={75} width={75}></img>
                        <Box paddingX={2} maxWidth={200}>
                          <Typography variant="caption">
                            {itemP.title}
                          </Typography>
                          <div marginY={1}>
                            <Typography
                              mr={1}
                              mt={1}
                              sx={{ display: "inline-block" }}
                            >
                              ${itemP.price}
                            </Typography>
                            x
                            <span style={{ fontSize: ".8rem" }}>
                              {item.quantity}
                            </span>
                          </div>
                        </Box>
                      </>
                    ) : null;
                  })}
                </Box>
                <Icon
                  onClick={() => removeFromCart(item.id)}
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <CancelOutlinedIcon />
                </Icon>
              </Box>
            );
          })}

          <Divider />
          <Box py={2} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: "larger" }}>Subtotal</Typography>
            <Typography sx={{ fontSize: "larger" }}>
              {total?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Typography>
          </Box>
          <Divider />
        </Box>
        <Box marginTop={4}>
          <Box>
            <Button
              variant="contained"
              fullWidth
              sx={{
                padding: 1,
                paddingX: 1,
                marginTop: 2,
                minWidth: 300,
                ...btnStyle,
              }}
              component={Link}
              to="/shoppingCart/cart"
              onClick={toggleDrawer("right", false)}
            >
              View Cart
            </Button>
          </Box>
          {/* <Box>
            <Button
              variant="contained"
              fullWidth
              sx={{ padding: 1, paddingX: 1, marginTop: 2, minWidth: 300 }}
              component={Link}
            >
              checkout
            </Button>
          </Box> */}
        </Box>
      </Box>
    </>
  );
}
