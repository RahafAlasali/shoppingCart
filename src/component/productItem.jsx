import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function productItem({
  item,
  shoppingCarts,
  handleDecrease,
  handleIncrement,
  handleAddToCart,
  removeFromCart,
}) {
  return (
    <>
      <Card
        key={item.id}
        sx={{
          width: "95%",
          m: 1,
          display: "inline-block",
        }}
      >
        <CardMedia
          sx={{
            height: 140,
            minHeight: 200,
            marginTop: 1,
            backgroundSize: "contain",
          }}
          image={item.image}
          title="green iguana"
        />
        <CardContent
          sx={{
            minHeight: 150,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontSize="medium"
          >
            {item.title}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            fontWeight="bold"
            fontSize="large"
          >
            {parseInt(item.price)} $
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {shoppingCarts.map((item) => item.id).includes(item.id) ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
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
                  return itemCart.id == item.id ? itemCart.quantity : null;
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
    </>
  );
}
