import React, { useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import {
  increment,
  decrease,
  addItemToCart,
  removeItemToCart,
  setProductsArray,
  setShoppingCartsArray,
  setQuantityCart,
} from "../state";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { store } from "../store";

export default function home() {
  const [products, setProducts] = useState([]);
  const quantityCart = useSelector((state) => {
    return state.cart.shoppingCart.quantity;
  });
  console.log(quantityCart, "quantityCart");
  const shoppingCarts = useSelector((state) => {
    return state.cart.shoppingCarts;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        dispatch(setProductsArray(data));
        var productsLocal = JSON.parse(localStorage.getItem("shoppingCarts"));
        var quantityCart = JSON.parse(localStorage.getItem("quantityCart"));
        dispatch(setQuantityCart(quantityCart));
        dispatch(setShoppingCartsArray(productsLocal));
      })
      .catch((error) => {})
      .finally(() => {});
  }, []);

  function handleAddToCart(id) {
    dispatch(addItemToCart(id));
    localStorage.setItem(
      "shoppingCarts",
      JSON.stringify(store.getState().cart.shoppingCarts)
    );
    localStorage.setItem("quantityCart", JSON.stringify(quantityCart + 1));
  }

  function removeFromCart(id) {
    dispatch(removeItemToCart(id));
    var t = store.getState().cart.shoppingCarts;
    console.log(store.getState().cart.shoppingCarts);
    localStorage.setItem("shoppingCarts", JSON.stringify(t));
    localStorage.setItem("quantityCart", JSON.stringify(quantityCart - 1));
  }

  function handleIncrement(id) {
    dispatch(increment(id));
    localStorage.setItem(
      "shoppingCarts",
      JSON.stringify(store.getState().cart.shoppingCarts)
    );
  }
  function handleDecrease(id) {
    dispatch(decrease(id));
    localStorage.setItem(
      "shoppingCarts",
      JSON.stringify(store.getState().cart.shoppingCarts)
    );
  }
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid spacing={2}>
            <Grid item xs={3} sm={3} md={3} lg={2}>
              {products.map((item) => (
                <Card
                  key={item.id}
                  sx={{
                    maxWidth: 350,
                    minWidth: 350,
                    m: 1,
                    display: "inline-block",
                  }}
                >
                  <CardMedia
                    sx={{
                      height: 140,
                      minHeight: 200,
                      backgroundSize: "contain",
                    }}
                    image={item.image}
                    title="green iguana"
                  />
                  <CardContent sx={{ minHeight: 150 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                    >
                      {parseInt(item.price)}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {shoppingCarts.map((item) => item.id).includes(item.id) ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ padding: 0 }}
                          onClick={() => handleDecrease(item.id)}
                        >
                          -
                        </Button>
                        <Box mx={1}>
                          {shoppingCarts.map((itemCart) => {
                            return itemCart.id == item.id
                              ? itemCart.quantity
                              : null;
                          })}
                        </Box>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ padding: 0 }}
                          onClick={() => handleIncrement(item.id)}
                        >
                          +
                        </Button>

                        <Button
                          variant="contained"
                          sx={{ mx: 1 }}
                          size="small"
                          onClick={() => removeFromCart(item.id)}
                        >
                          remove
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{ mx: 2 }}
                        onClick={() => handleAddToCart(item.id)}
                      >
                        Add to card
                      </Button>
                    )}
                  </CardActions>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
