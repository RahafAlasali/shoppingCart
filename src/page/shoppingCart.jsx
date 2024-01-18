import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../store";
import products from "../data/db";
import Grid from "@mui/material/Grid";

import {
  increment,
  decrease,
  addQuantityCartShopping,
  reduceQuantityCartShopping,
  addItemToCart,
  removeItemToCart,
} from "../state";
import { useEffect, useState } from "react";

export default function shoppingCart() {
  const [shoppingCarts, setShoppingCarts] = useState(
    useSelector((state) => {
      return state.quantity.shoppingCarts;
    })
  );

  const dispatch = useDispatch();
  function removeFromCart(id) {
    dispatch(reduceQuantityCartShopping());
    dispatch(removeItemToCart(id));
    var productsLocal = JSON.parse(localStorage.getItem("products"));
    var t = productsLocal.filter((item) => item.id != id);
    localStorage.setItem("products", JSON.stringify(t));
    setShoppingCarts(t);
    var quantityCart = JSON.parse(localStorage.getItem("quantityCart"));
    localStorage.setItem("quantityCart", JSON.stringify(quantityCart - 1));
  }
  function handleIncrement(id) {
    dispatch(increment(id));
    var productsLocal = JSON.parse(localStorage.getItem("products"));
    var t = productsLocal.map((item) =>
      item.id == id ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem("products", JSON.stringify(t));
    setShoppingCarts(t);
  }
  function handleDecrease(id) {
    dispatch(decrease(id));
    //// update
    // update store then localStorge with same value from store
    //  localStorage.setItem("products", JSON.stringify()) From store

    var productsLocal = JSON.parse(localStorage.getItem("products"));
    var t = productsLocal.map((item) =>
      item.id == id ? { ...item, quantity: item.quantity - 1 } : item
    );
    localStorage.setItem("products", JSON.stringify(t)); //
    setShoppingCarts(t);
  }

  const subscribe = store.subscribe(() => console.log("The state is update"));
  useEffect(() => {
    var arrayExisti = localStorage.getItem("products");
    if (arrayExisti == null) setShoppingCarts(shoppingCarts);
    else setShoppingCarts(JSON.parse(arrayExisti));
  }, []);
  return (
    <>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {shoppingCarts.length == 0 ? (
            <div sx={{ m: 5 }}>No product in cart</div>
          ) : (
            <Grid spacing={2}>
              <Grid item xs={12} sm={6} md={2} lg={3}></Grid>
              {shoppingCarts.map((item) => (
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
                    image="https://picsum.photos/200/300"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {products.map((itemA) => {
                        return itemA.id == item.id ? itemA.title : null;
                      })}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ padding: 0, backgroundColor: "#4e6378" }}
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
                        sx={{ padding: 0, backgroundColor: "#4e6378" }}
                        onClick={() => handleIncrement(item.id)}
                      >
                        +
                      </Button>

                      <Button
                        variant="contained"
                        sx={{ mx: 1, backgroundColor: "#4e6378" }}
                        size="small"
                        onClick={() => removeFromCart(item.id)}
                      >
                        remove
                      </Button>
                    </Box>
                  </CardActions>
                </Card>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
}
