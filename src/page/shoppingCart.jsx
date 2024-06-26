import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../store/index";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRule from "@mui/icons-material/HorizontalRule";

import {
  increment,
  decrease,
  removeItemToCart,
  setProductsArray,
  setTotal,
} from "../store/cart";
import { useEffect, useState } from "react";

export default function shoppingCart() {
  const btnStyle = {
    color: "#425068",
    background: "#FFF",
    border: "2px solid",
    "&:hover": {
      backgroundColor: "#4e6378 !important",
      color: "#FFF",
      border: "2px solid",
    },
  };
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
  var cartIds = shoppingCarts.map((item) => item.id);
  var productsCart = products.filter((itemPrd) => cartIds.includes(itemPrd.id));

  function removeFromCart(id) {
    dispatch(removeItemToCart(id));
  }
  function handleIncrement(id) {
    dispatch(increment(id));
  }
  function handleDecrease(id) {
    dispatch(decrease(id));
  }
  // const subscribe = store.subscribe(() => console.log("The state is update"));
  useEffect(() => {
    if (products.length == 0)
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
          {productsCart.map((itemCart) => {
            return (
              <>
                <Box
                  key={itemCart.id}
                  sx={{
                    marginY: "15px",
                  }}
                >
                  <Grid container spacing={1} justifyContent="center">
                    <Grid xs={10} sm={2} md={2} lg={2}>
                      <Box textAlign="center">
                        <img
                          src={itemCart.image}
                          height={130}
                          style={{ maxWidth: "95%", margin: "auto" }}
                        ></img>
                      </Box>
                    </Grid>

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
                        <Grid
                          xs={10}
                          sm={7}
                          md={7}
                          lg={5}
                          mt={{ xs: 2, md: 0 }}
                        >
                          <Typography fontSize={20} textAlign={"center"}>
                            Product
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            component="div"
                            textAlign={"center"}
                          >
                            {itemCart.title}
                          </Typography>
                        </Grid>

                        <Grid
                          xs={10}
                          sm={2}
                          md={2}
                          lg={2}
                          mt={{ xs: 2, md: 0 }}
                        >
                          <Typography fontSize={20} textAlign={"center"}>
                            Price
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            component="div"
                            sx={{ margin: "auto" }}
                            textAlign={"center"}
                          >
                            {itemCart.price}
                          </Typography>
                        </Grid>

                        <Grid
                          xs={10}
                          sm={2}
                          md={2}
                          lg={2}
                          mt={{ xs: 2, md: 0 }}
                        >
                          <Typography fontSize={20} textAlign={"center"}>
                            Quantity
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            textAlign={"center"}
                            component="div"
                          >
                            {
                              shoppingCarts.find(
                                (item) => item.id == itemCart.id
                              ).quantity
                            }
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
                        sx={{
                          mx: 0.5,
                          mt: 1,
                          minWidth: "50px",
                          ...btnStyle,
                        }}
                        onClick={() => handleDecrease(itemCart.id)}
                        disabled={
                          shoppingCarts.find((item) => item.id == itemCart.id)
                            .quantity > 1
                            ? false
                            : true
                        }
                      >
                        <HorizontalRule />
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          mx: 0.5,
                          mt: 1,
                          minWidth: "50px",
                          ...btnStyle,
                        }}
                        onClick={() => handleIncrement(itemCart.id)}
                      >
                        <AddIcon />
                      </Button>

                      <Button
                        variant="contained"
                        sx={{
                          mx: 0.5,
                          minWidth: "50px",
                          mt: 1,
                          ...btnStyle,
                        }}
                        size="small"
                        onClick={() => removeFromCart(itemCart.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                <Divider sx={{ backgroundColor: "#e3dede" }} />
              </>
            );
          })}
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
            {/* <Button
              variant="contained"
              sx={{ fontSize: { md: "large", xs: "x-small" } }}
            >
              checkout
            </Button> */}
          </Box>
        </Box>
      </Container>
    </>
  );
}
