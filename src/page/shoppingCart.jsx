import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../store/index";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  increment,
  decrease,
  removeItemToCart,
  setProductsArray,
  setTotal,
} from "../store/cart";
import { useEffect, useState } from "react";

export default function shoppingCart() {
  const shoppingCarts = useSelector((state) => {
    return state.cart.shoppingCarts;
  });
  const products = useSelector((state) => {
    return state.cart.products;
  });
  const total = useSelector((state) => {
    return state.cart.total;
  });
  const quantityCart = useSelector((state) => state.cart.shoppingCart.quantity);
  const dispatch = useDispatch();

  function removeFromCart(id) {
    dispatch(removeItemToCart(id));
  }
  function handleIncrement(id) {
    dispatch(increment(id));
  }
  function handleDecrease(id) {
    dispatch(decrease(id));
  }
  const subscribe = store.subscribe(() => console.log("The state is update"));
  useEffect(() => {
    (async () => {
      await fetch("https://fakestoreapi.com/products")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch(setProductsArray(data));
        });
    })();
  }, []);
  useEffect(() => {
    if (products.length != 0) dispatch(setTotal());
  }, [products, shoppingCarts]);

  useEffect(() => {
    localStorage.setItem("shoppingCarts", JSON.stringify(shoppingCarts));
    localStorage.setItem("quantityCart", JSON.stringify(quantityCart));
  }, [shoppingCarts]);
  return (
    <>
      <Container maxWidth="lg" sx={{ mb: 5 }}>
        <Typography
          variant="h4"
          component="div"
          sx={{ m: 5, textAlign: { xs: "center", sm: "start" } }}
        >
          Cart
        </Typography>
        <Box sx={{ m: 2 }}>
          {shoppingCarts.map((item) => (
            <>
              <Box
                key={item.id}
                sx={{
                  marginY: "15px",
                }}
              >
                <Grid container spacing={1} justifyContent="center">
                  {products.map((itemCart) => {
                    return (
                      itemCart.id == item.id && (
                        <Grid xs={10} sm={2} md={2} lg={2}>
                          <Box textAlign="center">
                            <img
                              src={itemCart.image}
                              height={130}
                              style={{ maxWidth: "95%", margin: "auto" }}
                            ></img>
                          </Box>
                        </Grid>
                      )
                    );
                  })}
                  <Grid
                    xs={12}
                    sm={6}
                    md={7}
                    lg={7}
                    display="flex"
                    alignItems="center"
                  >
                    <Grid
                      container
                      spacing={1}
                      display="flex"
                      alignItems="start"
                      justifyContent="center"
                    >
                      <Grid xs={10} sm={7} md={7} lg={5} mt={{ xs: 2, md: 0 }}>
                        <Typography fontSize={20} textAlign={"center"}>
                          Product
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          component="div"
                          textAlign={"center"}
                        >
                          {products.map((itemA) => {
                            return itemA.id == item.id ? itemA.title : null;
                          })}
                        </Typography>
                      </Grid>

                      <Grid xs={10} sm={2} md={2} lg={2} mt={{ xs: 2, md: 0 }}>
                        <Typography fontSize={20} textAlign={"center"}>
                          Price
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          component="div"
                          sx={{ margin: "auto" }}
                          textAlign={"center"}
                        >
                          {products.map((itemCart) => {
                            return itemCart.id == item.id
                              ? itemCart.price
                              : null;
                          })}
                        </Typography>
                      </Grid>

                      <Grid xs={10} sm={2} md={2} lg={2} mt={{ xs: 2, md: 0 }}>
                        <Typography fontSize={20} textAlign={"center"}>
                          Quantity
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          textAlign={"center"}
                          component="div"
                        >
                          {item.quantity}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    xs={12}
                    sm={4}
                    md={3}
                    lg={3}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mx: 0.5, mt: 1, minWidth: "unset", px: 3 }}
                      onClick={() => handleDecrease(item.id)}
                    >
                      -
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mx: 0.5, mt: 1, minWidth: "unset", px: 3 }}
                      onClick={() => handleIncrement(item.id)}
                    >
                      +
                    </Button>

                    <Button
                      variant="contained"
                      sx={{ mx: 0.5, mt: 1 }}
                      size="small"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Divider sx={{ backgroundColor: "#e3dede" }} />
            </>
          ))}
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ mx: 1, fontSize: { md: "x-large", xs: "small" } }}
            >
              Total :
              {total?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Typography>
            <Button
              variant="contained"
              sx={{ fontSize: { md: "large", xs: "x-small" } }}
            >
              checkout
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
