import { Routes, Route } from "react-router-dom";
import Home from "./page/home.jsx";

import Shoppingcart from "./page/shoppingCart.jsx";
import Nav from "./component/nav.jsx";
import Dashboard from "./page/dashboard.jsx";
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
        <Routes>
          <Route path="/react-shoppingCart" element={<Home />} />
          <Route path="/react-shoppingCart/cart" element={<Shoppingcart />} />
          <Route path="/react-shoppingCart/dashboard" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}
