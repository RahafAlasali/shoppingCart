import React, { useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Container from "@mui/material/Container";

import {
  increment,
  decrease,
  addItemToCart,
  removeItemToCart,
  setProductsArray,
  setShoppingCartsArray,
  setQuantityCart,
  setTotal,
} from "../store/cart";
import { setLogin } from "../store/auth";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
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
    if (localStorage.getItem("token")) {
      dispatch(setLogin(true));
    }
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
    dispatch(setTotal(total));
  }, [shoppingCarts]);

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
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {productsFilter.map((item) => (
            <h1>{item.name}</h1>
          ))}
          {products.length != 0 && (
            <Stack spacing={2} m={2} direction="row">
              <Button
                sx={{ display: { sm: "block", xs: "none" } }}
                variant="contained"
                onClick={() => {
                  handelFilter("all");
                }}
              >
                all
              </Button>

              {categories.map((item) => (
                <Button
                  sx={{ display: { sm: "block", xs: "none" } }}
                  variant="outlined"
                  onClick={() => {
                    handelFilter(item);
                  }}
                >
                  {item}
                </Button>
              ))}
            </Stack>
          )}
        </Box>
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={1}>
            {productsFilter.length == 0
              ? products.map((item) => (
                  <Grid xs={10} sm={6} md={5} lg={4}>
                    <Product
                      item={item}
                      shoppingCarts={shoppingCarts}
                      handleDecrease={handleDecrease}
                      handleIncrement={handleIncrement}
                      removeFromCart={removeFromCart}
                      handleAddToCart={handleAddToCart}
                    />
                  </Grid>
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
          {/* </Grid> */}
        </Box>
      </Container>
    </>
  );
}
