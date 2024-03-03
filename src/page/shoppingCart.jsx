import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../store";
import Divider from "@mui/material/Divider";

import {
  increment,
  decrease,
  reduceQuantityCartShopping,
  removeItemToCart,
  setProductsArray,
  setShoppingCartsArray,
} from "../state";
import { useEffect, useState } from "react";

export default function shoppingCart() {
  const [shoppingCarts, setShoppingCarts] = useState(
    useSelector((state) => {
      return state.quantity.shoppingCarts;
    })
  );
  const [products, setProducts] = useState(
    useSelector((state) => {
      return state.quantity.products;
    })
  );
  var t;
  const [total, setTotal] = useState(0); //(state) => state.quantity.total
  const dispatch = useDispatch();
  function removeFromCart(id) {
    dispatch(reduceQuantityCartShopping());
    dispatch(removeItemToCart(id));
    var t = shoppingCarts.filter((item) => item.id != id);
    localStorage.setItem("shoppingCarts", JSON.stringify(t));
    setShoppingCarts(t);
    var quantityCart = JSON.parse(localStorage.getItem("quantityCart"));
    localStorage.setItem("quantityCart", JSON.stringify(quantityCart - 1));
  }
  function handleIncrement(id) {
    dispatch(increment(id));
    var t = shoppingCarts.map((item) =>
      item.id == id ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem("shoppingCarts", JSON.stringify(t));
    setShoppingCarts(t);
  }
  function handleDecrease(id) {
    dispatch(decrease(id));
    var t = shoppingCarts.map((item) =>
      item.id == id ? { ...item, quantity: item.quantity - 1 } : item
    );
    localStorage.setItem("shoppingCarts", JSON.stringify(t));
    setShoppingCarts(t);
  }
  const subscribe = store.subscribe(() => console.log("The state is update"));
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        dispatch(setProductsArray(data));
      });
    var arrayExisti = localStorage.getItem("shoppingCarts");
    if (arrayExisti != null) setShoppingCarts(JSON.parse(arrayExisti));
    dispatch(setShoppingCartsArray(JSON.parse(arrayExisti)));
    // add to store
  }, []);
  useEffect(() => {
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
                <Box minWidth={100} textAlign={"center"}>
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
                      return itemCart.id == item.id ? itemCart.price : null;
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
