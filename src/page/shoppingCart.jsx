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
} from "../state";
import { useEffect, useState } from "react";

export default function shoppingCart() {
  const [shoppingCarts, setShoppingCarts] = useState(
    useSelector((state) => {
      return state.quantity.shoppingCarts;
    })
  );
  const pro = useSelector((state) => {
    return state.quantity.products;
  });
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
  const subscribe = store.subscribe(() => console.log("The state is update"));
  useEffect(() => {
    var arrayExisti = localStorage.getItem("products");
    if (arrayExisti == null) setShoppingCarts(shoppingCarts);
    else setShoppingCarts(JSON.parse(arrayExisti));
  }, []);
  useEffect(() => {
    var total = shoppingCarts
      .map((item) => {
        return (
          pro.find((M) => {
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
                {pro.map((itemCart) => {
                  return itemCart.id == item.id ? (
                    <Box>
                      <img
                        src={process.env.PUBLIC_URL + itemCart.img}
                        height={130}
                        width={130}
                      ></img>
                    </Box>
                  ) : null;
                })}
                <Box>
                  <Typography fontSize={20}>Title</Typography>
                  <Typography variant="subtitle2" component="div">
                    {pro.map((itemA) => {
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
                  >
                    {pro.map((itemCart) => {
                      return itemCart.id == item.id ? itemCart.price : null;
                    })}
                  </Typography>
                </Box>
                <Box>
                  <Typography fontSize={20}>Quantity</Typography>
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
