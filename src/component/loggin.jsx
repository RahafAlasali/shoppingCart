import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/auth";

export default function loggin() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  function onSubmit(e) {
    e.preventDefault();
    console.log(e.target.username.value, "Form");
    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status == 200) navigate("/shoppingCart");
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
        <Box marginY={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ padding: 4, m: 3, minWidth: "30%" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" py={0}>
                Login
              </Typography>
            </CardContent>
            <form onSubmit={onSubmit}>
              <Box marginTop={4}>
                <TextField label="Username" name="username" fullWidth />
              </Box>
              {/* <Box marginTop={2}>
                {/* <TextField
                  label="Password"
                  type="password"
                  name="password"
                  size="small"
                />
              </Box> */}
              <FormControl sx={{ my: 3 }} variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  name="password"
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <CardActions sx={{ marginTop: 4, padding: 0 }}>
                <Button type="submit" variant="contained" fullWidth>
                  Login
                </Button>
              </CardActions>
            </form>
          </Card>
        </Box>
      </Container>
    </>
  );
}
