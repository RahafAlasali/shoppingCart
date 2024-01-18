import { Routes, Route } from "react-router-dom";
import Home from "./page/home.jsx";

import Shoppingcart from "./page/shoppingCart.jsx";
import Nav from "./component/nav.jsx";
import Dashboard from "./page/dashboard.jsx";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Shoppingcart />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}
