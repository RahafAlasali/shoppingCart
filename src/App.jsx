import { Routes, Route } from "react-router-dom";
import Home from "./page/home.jsx";
import Layout from "./page/layout.jsx";
import Shoppingcart from "./page/shoppingCart.jsx";
import Dashboard from "./page/dashboard.jsx";
import Login from "././component/login.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFF",
    },
    secondary: { main: "#4e6378" },
  },
});
export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes basename="/shoppingCart">
          <Route path="shoppingCart" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/shoppingCart/cart" element={<Shoppingcart />} />
            <Route path="/shoppingCart/dashboard" element={<Dashboard />} />
            <Route path="/shoppingCart/login" element={<Login />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}
