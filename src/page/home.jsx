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
  setCategoriesArray,
  setTotal,
} from "../store/cart";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { store } from "../store";
import Product from "../component/productItem";

export default function home() {
  const products = useSelector((state) => {
    return state.cart.products;
  });
  const quantityCart = useSelector((state) => {
    return state.cart.shoppingCart.quantity;
  });
  const [productsFilter, setProductsFilter] = useState([]);
  const categories = useSelector((state) => {
    return state.cart.categories;
  });
  const shoppingCarts = useSelector((state) => {
    return state.cart.shoppingCarts;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length == 0)
      (async () => {
        await fetch("https://fakestoreapi.com/products")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            dispatch(setProductsArray(data));
          })
          .catch((error) => {});
      })();
    if (categories.length == 0)
      fetch("https://fakestoreapi.com/products/categories")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch(setCategoriesArray(data));
        })
        .catch((error) => {});
  }, []);

  useEffect(() => {
    if (products.length != 0) dispatch(setTotal());
  }, [products, shoppingCarts]);

  useEffect(() => {
    localStorage.setItem("shoppingCarts", JSON.stringify(shoppingCarts));
    localStorage.setItem("quantityCart", JSON.stringify(quantityCart));
  }, [shoppingCarts]);

  function handleAddToCart(id) {
    dispatch(addItemToCart(id));
  }

  function removeFromCart(id) {
    dispatch(removeItemToCart(id));
  }
  const subscribe = store.subscribe(() => {
    console.log("store update Home page ........... ", shoppingCarts);
  });

  function handleIncrement(id) {
    dispatch(increment(id));
  }
  function handleDecrease(id) {
    dispatch(decrease(id));
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
          {products.length != 0 && (
            <Stack spacing={2} m={2} direction="row">
              <Button
                sx={{
                  display: { sm: "block", xs: "none" },
                  fontSize: { sm: "x-small", md: "small" },
                }}
                variant="contained"
                onClick={() => {
                  handelFilter("all");
                }}
              >
                all
              </Button>

              {categories.map((item) => (
                <Button
                  sx={{
                    display: { sm: "block", xs: "none" },
                    fontSize: { sm: "x-small", md: "small" },
                  }}
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
        <Box>
          <Grid container justifyContent={{ xs: "center", sm: "start" }}>
            {productsFilter.length == 0
              ? products.map((item) => (
                  <Grid xs={12} sm={6} md={4} lg={4}>
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
                  <Grid xs={12} sm={6} md={4} lg={4}>
                    <Product
                      item={item}
                      shoppingCarts={shoppingCarts}
                      handleDecrease={handleDecrease}
                      handleIncrement={handleIncrement}
                      removeFromCart={removeFromCart}
                      handleAddToCart={handleAddToCart}
                    />
                  </Grid>
                ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
