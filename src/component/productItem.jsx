import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRule from "@mui/icons-material/HorizontalRule";

export default function productItem({
  item,
  shoppingCarts,
  handleDecrease,
  handleIncrement,
  handleAddToCart,
  removeFromCart,
}) {
  const btnStyle = {
    color: "#425068",
    background: "#FFF",
    border: "2px solid",
    "&:hover": {
      backgroundColor: "#4e6378 !important",
      color: "#FFF",
      border: "2px solid",
    },
  };
  var itemCart = shoppingCarts.find((itemCart) => {
    return itemCart.id == item.id;
  });

  return (
    <>
      <Card
        key={item.id}
        sx={{
          width: "95%",
          m: 1,
          display: "inline-block",
        }}
        elevation={2}
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

          <Rating
            name="read-only"
            value={item.rating.rate}
            precision={0.5}
            readOnly
          />
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            fontWeight="bold"
            fontSize="large"
          >
            ${item.price}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {itemCart ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{
                  mx: 1,
                  minWidth: "40px",
                  ...btnStyle,
                }}
                onClick={() => handleDecrease(item.id)}
                disabled={itemCart.quantity > 1 ? false : true}
              >
                <HorizontalRule />
              </Button>

              {itemCart.quantity && <Box my="auto">{itemCart.quantity}</Box>}

              <Button
                variant="contained"
                size="small"
                sx={{
                  mx: 1,
                  minWidth: "40px",
                  ...btnStyle,
                }}
                onClick={() => handleIncrement(item.id)}
              >
                <AddIcon />
              </Button>

              <Button
                variant="contained"
                sx={{
                  mx: 1,
                  minWidth: "40px",
                  ...btnStyle,
                }}
                size="small"
                onClick={() => removeFromCart(item.id)}
              >
                <DeleteIcon />
              </Button>
            </Box>
          ) : (
            <Box>
              <Button
                variant="contained"
                sx={{
                  mx: 2,
                  ...btnStyle,
                }}
                size="small"
                onClick={() => handleAddToCart(item.id)}
              >
                <AddShoppingCart />
              </Button>
            </Box>
          )}
        </CardActions>
      </Card>
    </>
  );
}
