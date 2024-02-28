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
  addQuantityCartShopping,
  reduceQuantityCartShopping,
  addItemToCart,
  removeItemToCart,
  setProductsArray,
  setShoppingCartsArray,
} from "../state";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";

export default function home() {
  const [products, setProducts] = useState([]);
  const quantityCart = useSelector(
    (state) => state.quantity.shoppingCart.quantity
  );
  const [shoppingCarts, setShoppingCarts] = useState(
    useSelector((state) => {
      return state.quantity.shoppingCarts;
    })
  );
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://rahafalasali.github.io/shoppingCart/db.json")
      .then((response) => {
        return response.data.products;
      })
      .then((data) => {
        setProducts(data);
        dispatch(setProductsArray(data));
        var productsLocal = JSON.parse(localStorage.getItem("shoppingCarts"));
        if (productsLocal == null) setShoppingCarts([]);
        else {
          setShoppingCarts(productsLocal);
          setShoppingCartsArray(productsLocal);
        }
      })
      .catch((error) => {})
      .finally(() => {});
  }, []);

  function handleAddToCart(id) {
    dispatch(addQuantityCartShopping());
    var product = { id, quantity: 1 };
    dispatch(addItemToCart(id));
    shoppingCarts.push(product);
    setShoppingCarts(shoppingCarts);
    localStorage.setItem("shoppingCarts", JSON.stringify(shoppingCarts));
    localStorage.setItem("quantityCart", JSON.stringify(quantityCart + 1));
  }

  function removeFromCart(id) {
    // console.log(quantityCart, "quantityCart");
    dispatch(reduceQuantityCartShopping());
    dispatch(removeItemToCart(id));
    var t = shoppingCarts.filter((item) => item.id != id);
    localStorage.setItem("shoppingCarts", JSON.stringify(t));
    setShoppingCarts(t);
    localStorage.setItem("quantityCart", JSON.stringify(quantityCart - 1));
  }

  function handleIncrement(id) {
    dispatch(increment(id));
    var productsLocal = JSON.parse(localStorage.getItem("shoppingCarts"));
    var t = productsLocal.map((item) =>
      item.id == id ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem("shoppingCarts", JSON.stringify(t));
    setShoppingCarts(t);
  }
  function handleDecrease(id) {
    dispatch(decrease(id));
    var productsLocal = JSON.parse(localStorage.getItem("shoppingCarts"));
    var t = productsLocal.map((item) =>
      item.id == id ? { ...item, quantity: item.quantity - 1 } : item
    );
    localStorage.setItem("shoppingCarts", JSON.stringify(t));
    setShoppingCarts(t);
  }
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid spacing={2}>
            <Grid item xs={12} sm={6} md={2} lg={3}>
              {products.map((item) => (
                <Card
                  key={item.id}
                  sx={{
                    maxWidth: 275,
                    minWidth: 275,
                    minHeight: 300,
                    m: 3,
                    display: "inline-block",
                  }}
                >
                  <CardMedia
                    sx={{ height: 140 }}
                    image={process.env.PUBLIC_URL + item.img}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                    >
                      {item.price}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    {shoppingCarts.map((item) => item.id).includes(item.id) ? (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
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
