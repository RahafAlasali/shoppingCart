import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../store/index";
import Divider from "@mui/material/Divider";

import {
  increment,
  decrease,
  removeItemToCart,
  setProductsArray,
  setShoppingCartsArray,
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
    localStorage.setItem(
      "shoppingCarts",
      JSON.stringify(store.getState().cart.shoppingCarts)
    );
    localStorage.setItem(
      "quantityCart",
      JSON.stringify(store.getState().cart.shoppingCart.quantity)
    );
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
      var arrayExisti = localStorage.getItem("shoppingCarts");
      dispatch(setShoppingCartsArray(JSON.parse(arrayExisti)));
    })();
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
  return (
    <>
      <Container maxWidth="lg" sx={{ mb: 5 }}>
        <Typography variant="h4" component="div" sx={{ m: 5 }}>
          Cart
        </Typography>
        <Box sx={{ m: 5 }}>
          {shoppingCarts.map((item) => (
            <>
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  maxHeight: "150px",
                  alignItems: "center",
                  marginY: "15px",
                }}
              >
                {products.map((itemCart) => {
                  return itemCart.id == item.id ? (
                    <Box>
                      <img src={itemCart.image} height={130} width={130}></img>
                    </Box>
                  ) : null;
                })}
                <Box minWidth={100} maxWidth={150} textAlign={"center"}>
                  <Typography fontSize={20}>Title</Typography>
                  <Typography variant="subtitle2" component="div">
                    {products.map((itemA) => {
                      return itemA.id == item.id ? itemA.title : null;
                    })}
                  </Typography>
                </Box>
                <Box>
                  <Typography fontSize={20}>Price</Typography>
                  <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{ margin: "auto" }}
                    textAlign={"center"}
                  >
                    {products.map((itemCart) => {
                      return itemCart.id == item.id
                        ? parseInt(itemCart.price)
                        : null;
                    })}
                  </Typography>
                </Box>
                <Box>
                  <Typography fontSize={20}>Quantity</Typography>
                  <Typography
                    variant="subtitle2"
                    textAlign={"center"}
                    component="div"
                  >
                    {item.quantity}
                  </Typography>
                </Box>
                <div>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mx: 1 }}
                    onClick={() => handleDecrease(item.id)}
                  >
                    -
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mx: 1 }}
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
                </div>
              </Box>
              <Divider sx={{ backgroundColor: "#e3dede" }} />
            </>
          ))}
          <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
            <Typography variant="h5" sx={{ mx: 1 }}>
              Total : {total}
            </Typography>
            <Button variant="contained">checkout</Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
