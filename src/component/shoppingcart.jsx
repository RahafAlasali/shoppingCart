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
import {
  setShoppingCartsArray,
  removeItemToCart,
  setTotal,
  setQuantityCart,
} from "../state";

export default function shoppingcart({ toggleDrawer }) {
  const shoppingCarts = useSelector((state) => {
    return state.cart.shoppingCarts;
  });
  const total = useSelector((state) => {
    return state.cart.total;
  });
  console.log(shoppingCarts, "shoppingCarts");
  const quantityCart = useSelector((state) => state.cart.shoppingCart.quantity);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const subscribe = store.subscribe(() => {
    console.log("store update", store.getState().cart.shoppingCarts);
  });

  function removeFromCart(id) {
    dispatch(removeItemToCart(id));
    // setQuantityCart(store.getState().cart.shoppingCart.quantity);
    var t = store.getState().cart.shoppingCarts;
    console.log(store.getState().cart.shoppingCarts);
    // setShoppingCarts(store.getState().cart.shoppingCarts);
    localStorage.setItem("shoppingCarts", JSON.stringify(t));
    localStorage.setItem("quantityCart", JSON.stringify(quantityCart - 1));
  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        var productsLocal = JSON.parse(localStorage.getItem("shoppingCarts"));
        var quantityCart = JSON.parse(localStorage.getItem("quantityCart"));
        dispatch(setQuantityCart(quantityCart));
        // if (productsLocal == null) setShoppingCarts([]);
        // else {
        // setShoppingCarts(productsLocal);
        dispatch(setShoppingCartsArray(productsLocal));
        // }
      })
      .catch((error) => {})
      .finally(() => {});
  }, []);
  useEffect(() => {
    var total = shoppingCarts
      .map((item) => {
        return (
          parseInt(
            products.find((M) => {
              return M.id == item.id;
            })?.price
          ) * item.quantity
        );
      })
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
    // setTotalDate(total);
    dispatch(setTotal(total));
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
            <Typography gutterBottom variant="h6">
              <Box pb={2}>Shopping Cart</Box>
            </Typography>
            <Icon onClick={toggleDrawer("right", false)}>
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
                          <Typography>{itemP.title}</Typography>
                          <Typography marginY={1}>
                            {parseInt(itemP.price)} X {item.quantity}
                          </Typography>
                        </Box>
                      </>
                    ) : null;
                  })}
                </Box>
                <Icon onClick={() => removeFromCart(item.id)}>
                  <CancelOutlinedIcon />
                </Icon>
              </Box>
            );
          })}

          <Divider />
          <Box py={2} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Subtotal</Typography>
            <Typography> {total}</Typography>
          </Box>
          <Divider />
        </Box>
        <Box>
          <Box>
            <Button
              variant="contained"
              size="large"
              sx={{ padding: 1, paddingX: 1, marginTop: 2, minWidth: 300 }}
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
              sx={{ padding: 1, paddingX: 1, marginTop: 2, minWidth: 300 }}
              component={Link}
            >
              checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
