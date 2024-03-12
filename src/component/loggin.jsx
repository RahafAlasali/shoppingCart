import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function loggin() {
  let navigate = useNavigate();
  function onSubmit() {
    console.log(
      "Form",
      JSON.stringify({
        username: "mor_2314",
        password: "83r5^_",
      })
    );
    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: "mor_2314",
        password: "83r5^_",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        navigate("/shoppingCart");
        // localStorage.setItem("token", JSON.stringify(res.token));
        return res.json();
      })
      .then((json) => {
        //set loggin true in stoe
        localStorage.setItem("token", JSON.stringify(json.token));
      });
  }
  return (
    <>
      <Container maxWidth="lg">
        <Box m={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ padding: 4, m: 3 }}>
            <div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Loggin
                </Typography>
              </CardContent>
              <Box marginTop={2}>
                <TextField required label="username" />
              </Box>
              <Box marginTop={2}>
                <TextField required label="Password" type="password" />
              </Box>
              <CardActions sx={{ marginTop: 2, padding: 0 }}>
                <Button type="submit" variant="contained" onClick={onSubmit}>
                  Submit
                </Button>
              </CardActions>
            </div>
          </Card>
        </Box>
      </Container>
    </>
  );
}
