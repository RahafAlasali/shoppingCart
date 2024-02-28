import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Divider from "@mui/material/Divider";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { reduceQuantityCartShopping, removeItemToCart } from "../state";

export default function shoppingcart({ toggleDrawer }) {
  const shoppingCarts = JSON.parse(localStorage.getItem("shoppingCarts"));
  const [products, setProducts] = useState([]);
  var shoppingCartIds = shoppingCarts.map((item) => item.id);
  const dispatch = useDispatch();

  function removeFromCart(id) {
    dispatch(reduceQuantityCartShopping());
    dispatch(removeItemToCart(id));
    var productsLocal = JSON.parse(localStorage.getItem("shoppingCarts"));
    var t = productsLocal.filter((item) => item.id != id);
    localStorage.setItem("shoppingCarts", JSON.stringify(t));
    // setShoppingCarts(t);
    var quantityCart = JSON.parse(localStorage.getItem("quantityCart"));
    localStorage.setItem("quantityCart", JSON.stringify(quantityCart - 1));
  }

  useEffect(() => {
    axios
      .get("https://rahafalasali.github.io/shoppingCart/db.json")
      .then((response) => {
        return response.data.products;
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {})
      .finally(() => {});
  }, []);
  var itemD = null;
  return (
    <>
      <Box minWidth={250} p={4}>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography gutterBottom variant="h6">
              <Box pb={2}>Shopping Cart</Box>
            </Typography>
            <Icon onClick={toggleDrawer("right", false)}>
              <CloseIcon />
            </Icon>
          </Box>
          <Divider />
          {products.map((item) => {
            if (shoppingCartIds.includes(item.id)) {
              return (
                <Box
                  py={2}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/imgs/product-1.png"}
                      height={75}
                      width={75}
                    ></img>
                    <Box paddingX={1}>
                      <Typography>{item.title}</Typography>
                      <Typography> 2 X 200</Typography>
                    </Box>
                  </Box>
                  <Icon onClick={() => removeFromCart(item.id)}>
                    <CancelOutlinedIcon />
                  </Icon>
                </Box>
              );
            }
            return null;
          })}

          <Divider />
          <Box py={2} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Subtotal</Typography>
            <Typography> 1000</Typography>
          </Box>
          <Divider />
        </Box>
        <Box>
          <Box>
            <Button
              variant="contained"
              size="large"
              sx={{ padding: 1, paddingX: 1, marginTop: 2, minWidth: 250 }}
              component={Link}
              to="/shoppingCart/cart"
              onClick={toggleDrawer("right", false)}
            >
              View Cart
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              size="large"
              sx={{ padding: 1, paddingX: 1, marginTop: 2, minWidth: 250 }}
              component={Link}
            >
              checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
