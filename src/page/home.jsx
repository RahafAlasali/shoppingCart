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
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { store } from "../store";
import Product from "../component/productItem";

export default function home() {
  const [products, setProducts] = useState([]);
  const quantityCart = useSelector((state) => {
    return state.cart.shoppingCart.quantity;
  });
  const [productsFilter, setProductsFilter] = useState([]);
  const [categories, setCategories] = useState([]);
  console.log(productsFilter, "productsFilter");
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
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {});
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
  function handelFilter(item) {
    if (item == "all") {
      setProductsFilter([]);
    } else {
      var prdFilter = products.filter((itemP) => {
        return itemP.category == item;
      });
      setProductsFilter(prdFilter);
    }
  }
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {productsFilter.map((item) => (
            <h1>{item.name}</h1>
          ))}
          <Stack spacing={2} m={2} direction="row">
            <Button
              variant="contained"
              onClick={() => {
                handelFilter("all");
              }}
            >
              all
            </Button>
            {categories.map((item) => (
              <Button
                variant="outlined"
                onClick={() => {
                  handelFilter(item);
                }}
              >
                {item}
              </Button>
            ))}
          </Stack>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid spacing={2}>
            <Grid item xs={3} sm={3} md={3} lg={2}>
              {productsFilter.length == 0
                ? products.map((item) => (
                    <Product
                      item={item}
                      shoppingCarts={shoppingCarts}
                      handleDecrease={handleDecrease}
                      handleIncrement={handleIncrement}
                      removeFromCart={removeFromCart}
                      handleAddToCart={handleAddToCart}
                    />
                  ))
                : productsFilter.map((item) => (
                    <Product
                      item={item}
                      shoppingCarts={shoppingCarts}
                      handleDecrease={handleDecrease}
                      handleIncrement={handleIncrement}
                      removeFromCart={removeFromCart}
                      handleAddToCart={handleAddToCart}
                    />
                  ))}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
