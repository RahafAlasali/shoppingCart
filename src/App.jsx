import { Routes, Route } from "react-router-dom";
import Home from "./page/home.jsx";

import Shoppingcart from "./page/shoppingCart.jsx";
import Nav from "./component/nav.jsx";
import Dashboard from "./page/dashboard.jsx";
import Loggin from "././component/loggin.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4e6378",
    },
    secondary: { main: "#919599" },
  },
});
export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Nav />
        <Routes basename="/shoppingCart">
          <Route path="/shoppingCart" element={<Home />} />
          <Route path="/shoppingCart/cart" element={<Shoppingcart />} />
          <Route path="/shoppingCart/dashboard" element={<Dashboard />} />
          <Route path="/shoppingCart/loggin" element={<Loggin />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}
