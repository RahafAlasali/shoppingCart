import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../store";
import axios from "axios";

import {
  increment,
  decrease,
  reduceQuantityCartShopping,
  removeItemToCart,
} from "../state";
import { useEffect, useState } from "react";

export default function shoppingCart() {
  const [products, setProducts] = useState([]);
  const [shoppingCarts, setShoppingCarts] = useState(
    useSelector((state) => {
      return state.quantity.shoppingCarts;
    })
  );
  var t;
  const [total, setTotal] = useState(0); //(state) => state.quantity.total
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
  console.log("rerender ...");

  // products.map((item) => console.log(item));
  const subscribe = store.subscribe(() => console.log("The state is update"));
  useEffect(() => {
    (async () => {
      const getDatas = async () => {
        const response = await fetch("http://localhost:8000/products");
        const data = await response.json();
        console.log("data", data);

        setProducts(data);
      };

      await getDatas();

      var arrayExisti = localStorage.getItem("products");
      if (arrayExisti == null) setShoppingCarts(shoppingCarts);
      else setShoppingCarts(JSON.parse(arrayExisti));

      console.log("jsdlkfjdslk");
    })();
  }, []);
  useEffect(() => {
    console.log("shoppingCarts");
    var total = shoppingCarts
      .map((item) => {
        return (
          products.find((M) => {
            return M.id == item.id;
          })?.price * item.quantity
        );
      })
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);

    setTotal(total);
  }, [shoppingCarts]);
  return (
    <>
      <Container maxWidth="lg" sx={{ mb: 5 }}>
        <Box sx={{ m: 5 }}>
          {shoppingCarts.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                maxHeight: "150px",
                alignItems: "center",
                marginTop: "15px",
                backgroundColor: "#e3dede",
              }}
            >
              <Box>
                <img src="https://picsum.photos/200/150"></img>
              </Box>
              <Box>
                <Typography>Title</Typography>
                <Typography variant="subtitle2" component="div">
                  {products.map((itemA) => {
                    return itemA.id == item.id ? itemA.title : null;
                  })}
                </Typography>
              </Box>
              <Box>
                <Typography>Price</Typography>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ margin: "auto" }}
                >
                  {products.map((itemCart) => {
                    return itemCart.id == item.id ? itemCart.price : null;
                  })}
                </Typography>
              </Box>
              <Box>
                <Typography>Quantity</Typography>
                <Typography variant="subtitle2" component="div">
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
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          Total : {total}
        </Box>
      </Container>
    </>
  );
}
