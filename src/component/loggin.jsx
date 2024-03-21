import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/auth";

export default function loggin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  function onSubmit(e) {
    e.preventDefault();
    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        navigate("/shoppingCart");
        return res.json();
      })
      .then((json) => {
        dispatch(setLogin(true));
        localStorage.setItem("token", JSON.stringify(json.token));
      });
  }
  return (
    <>
      <Container maxWidth="lg">
        <Box m={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ padding: 4, m: 3 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" py={0}>
                Loggin
              </Typography>
            </CardContent>
            <form onSubmit={onSubmit}>
              <Box marginTop={2}>
                <TextField
                  required
                  label="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Box>
              <Box marginTop={2}>
                <TextField
                  required
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <CardActions sx={{ marginTop: 2, padding: 0 }}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </CardActions>
            </form>
          </Card>
        </Box>
      </Container>
    </>
  );
}
